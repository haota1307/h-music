import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { grantPermission, DEFAULT_PERMISSIONS } from "@/lib/auth";

const signUpSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  username: z
    .string()
    .min(3, "Username phải có ít nhất 3 ký tự")
    .max(20, "Username không được quá 20 ký tự")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username chỉ được chứa chữ cái, số và dấu gạch dưới"
    ),
  password: z
    .string()
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Mật khẩu phải chứa ít nhất 1 chữ thường, 1 chữ hoa và 1 số"
    ),
  displayName: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  agreedToTerms: z
    .boolean()
    .refine((val) => val === true, "Bạn phải đồng ý với điều khoản sử dụng"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = signUpSchema.parse(body);

    // Check if email already exists
    const existingUserByEmail = await prisma.user.findUnique({
      where: { email: validatedData.email.toLowerCase() },
    });

    if (existingUserByEmail) {
      return NextResponse.json(
        { error: "Email này đã được sử dụng" },
        { status: 400 }
      );
    }

    // Check if username already exists
    const existingUserByUsername = await prisma.user.findUnique({
      where: { username: validatedData.username },
    });

    if (existingUserByUsername) {
      return NextResponse.json(
        { error: "Username này đã được sử dụng" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password, 12);

    // Create user with permissions in a transaction
    const user = await prisma.$transaction(async (tx) => {
      // Create user with profile
      const newUser = await tx.user.create({
        data: {
          email: validatedData.email.toLowerCase(),
          username: validatedData.username,
          password: hashedPassword,
          displayName: validatedData.displayName || validatedData.username,
          profile: {
            create: {
              firstName: validatedData.firstName,
              lastName: validatedData.lastName,
            },
          },
        },
        include: {
          profile: true,
        },
      });

      // Grant default permissions within the transaction
      const defaultPermissions = DEFAULT_PERMISSIONS.USER;
      for (const permission of defaultPermissions) {
        const permissionRecord = await tx.permission.findUnique({
          where: { name: permission },
        });

        if (permissionRecord) {
          await tx.userPermission.create({
            data: {
              userId: newUser.id,
              permissionId: permissionRecord.id,
              granted: true,
              grantedBy: null, // System grants don't have a grantedBy user
              reason: "Default permissions for new user",
            },
          });
        }
      }

      // Log audit event within transaction
      await tx.auditLog.create({
        data: {
          userId: newUser.id,
          action: "REGISTER",
          entityType: "User",
          entityId: newUser.id,
          metadata: {
            email: newUser.email,
            username: newUser.username,
          },
        },
      });

      return newUser;
    });

    // Return user data (without password)
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(
      {
        message: "Đăng ký thành công",
        user: userWithoutPassword,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    console.error("Sign up error:", error);
    return NextResponse.json(
      { error: "Có lỗi xảy ra khi đăng ký. Vui lòng thử lại sau." },
      { status: 500 }
    );
  }
}
