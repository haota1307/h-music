# H-Music API Refactoring Guide

## Tổng quan tái cấu trúc

Chúng ta đã tái cấu trúc hoàn toàn cách gọi API trong H-Music để có code clean, maintainable và type-safe hơn.

## Cấu trúc mới

### 1. Axios Configuration (`src/lib/axios.ts`)

- ✅ Axios instance với interceptors
- ✅ Tự động thêm authentication headers
- ✅ Error handling tập trung với thông báo tiếng Việt
- ✅ Request/Response logging trong development
- ✅ Retry logic thông minh
- ✅ Token refresh tự động

### 2. API Endpoints Constants (`src/constants/api-endpoints.ts`)

```typescript
// Thay vì hardcode URL
await fetch("/api/auth/signup", {...})

// Sử dụng constants
import { AUTH_ENDPOINTS } from '@/constants/api-endpoints'
apiClient.post(AUTH_ENDPOINTS.SIGNUP, data)
```

### 3. Custom Hooks (`src/hooks/`)

#### Authentication Hooks (`use-auth.ts`)

```typescript
// Đăng ký
const signup = useSignup();
signup.mutate({
  username: "user123",
  email: "user@example.com",
  password: "password123",
});

// Đăng nhập
const signin = useSignin();
signin.mutate({
  email: "user@example.com",
  password: "password123",
});

// Lấy thông tin user
const { user, isAuthenticated, isLoading } = useAuth();

// Kiểm tra permissions
const { hasRole, isPremium, isAdmin } = usePermissions();
```

#### Music Hooks (`use-music.ts`)

```typescript
// Lấy charts
const { data: charts, isLoading } = useCharts("weekly");

// Tìm kiếm nhạc
const { data: searchResults } = useSearchMusic({
  query: "Sơn Tùng M-TP",
  type: "tracks",
});

// Toggle favorite
const toggleFavorite = useToggleFavorite();
toggleFavorite.mutate({ trackId: "123", isLiked: false });

// Quản lý playlist
const createPlaylist = useCreatePlaylist();
const updatePlaylist = useUpdatePlaylist();
const deletePlaylist = useDeletePlaylist();
```

### 4. Provider Setup (`src/app/layout.tsx`)

```typescript
<QueryProvider>
  <ClientSessionProvider>
    <ThemeProvider>
      {children}
      <ToastProvider />
    </ThemeProvider>
  </ClientSessionProvider>
</QueryProvider>
```

## So sánh Before/After

### BEFORE (Cũ)

```typescript
// Signup component - cách cũ
const onSubmit = async (data) => {
  try {
    setIsLoading(true);
    setError("");

    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Có lỗi xảy ra");
    }

    setSuccess(true);
    // Handle success...
  } catch (error) {
    setError(error.message);
  } finally {
    setIsLoading(false);
  }
};
```

### AFTER (Mới)

```typescript
// Signup component - cách mới
import { useSignup } from "@/hooks/use-auth";

const signup = useSignup();

const onSubmit = (data) => {
  signup.mutate(
    {
      username: data.username,
      email: data.email,
      password: data.password,
    },
    {
      onSuccess: () => {
        setSuccess(true);
        // Success được handle tự động trong hook
      },
      // Error cũng được handle tự động
    }
  );
};

// Loading state
{
  signup.isPending && <Spinner />;
}

// Error state
{
  signup.error && <ErrorMessage />;
}
```

## Lợi ích

### ✅ Code Clean hơn

- Loại bỏ boilerplate code
- Tập trung business logic
- Tách biệt concerns

### ✅ Type Safety

- TypeScript interfaces cho tất cả API responses
- IntelliSense support
- Compile-time error checking

### ✅ Error Handling Tập trung

- Thông báo lỗi nhất quán
- Retry logic thông minh
- Network error handling

### ✅ Caching & Performance

- Automatic caching với TanStack Query
- Background refetch
- Optimistic updates
- Infinite queries support

### ✅ Developer Experience

- React Query DevTools
- Request/Response logging
- Toast notifications
- Loading states tự động

## Cách sử dụng trong Component

### 1. Basic Usage

```typescript
"use client";

import { useCharts, useToggleFavorite } from "@/hooks/use-music";

export default function MusicPage() {
  const { data: charts, isLoading, error } = useCharts("weekly");
  const toggleFavorite = useToggleFavorite();

  if (isLoading) return <Loading />;
  if (error) return <Error message={error.message} />;

  return (
    <div>
      {charts?.tracks.map((track) => (
        <TrackItem
          key={track.id}
          track={track}
          onToggleFavorite={() =>
            toggleFavorite.mutate({
              trackId: track.id,
              isLiked: track.isLiked,
            })
          }
        />
      ))}
    </div>
  );
}
```

### 2. Form với Mutation

```typescript
import { useSignup } from "@/hooks/use-auth";

export default function SignupForm() {
  const signup = useSignup();

  const onSubmit = (formData) => {
    signup.mutate(formData);
    // Success/Error được handle tự động via toast
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Form fields */}
      <button type="submit" disabled={signup.isPending}>
        {signup.isPending ? "Đang xử lý..." : "Đăng ký"}
      </button>

      {signup.error && <div className="error">{signup.error.message}</div>}
    </form>
  );
}
```

## Migration Checklist

### ✅ Đã hoàn thành

- [x] Axios configuration với interceptors
- [x] API endpoints constants
- [x] Authentication hooks
- [x] Music hooks
- [x] TanStack Query setup
- [x] Toast notifications
- [x] Provider configuration
- [x] Signup page migration

### 🔄 Cần làm tiếp

- [ ] Migrate tất cả API calls sang hooks
- [ ] Thêm infinite scroll hooks
- [ ] Implement upload hooks
- [ ] Add real-time hooks với WebSocket
- [ ] Performance optimizations
- [ ] Error boundary integration

## Best Practices

### 1. Naming Convention

```typescript
// Query hooks: use + Resource + action (optional)
useCharts();
useTrack(id);
useSearchMusic(params);

// Mutation hooks: use + Action + Resource
useCreatePlaylist();
useUpdateTrack();
useDeletePlaylist();
```

### 2. Error Handling

```typescript
// Trong hooks, error được handle tự động
// Component chỉ cần hiển thị UI
{
  mutation.error && (
    <Alert variant="destructive">{mutation.error.message}</Alert>
  );
}
```

### 3. Loading States

```typescript
// Sử dụng built-in loading states
{
  query.isLoading && <Skeleton />;
}
{
  mutation.isPending && <Spinner />;
}
```

### 4. Optimistic Updates

```typescript
const toggleFavorite = useMutation({
  mutationFn: (data) => apiClient.post("/favorites", data),
  onMutate: async (newData) => {
    // Cancel outgoing refetches
    await queryClient.cancelQueries(["favorites"]);

    // Snapshot previous value
    const previousData = queryClient.getQueryData(["favorites"]);

    // Optimistically update
    queryClient.setQueryData(["favorites"], (old) => [...old, newData]);

    return { previousData };
  },
  onError: (err, newData, context) => {
    // Rollback on error
    queryClient.setQueryData(["favorites"], context.previousData);
  },
});
```

## Kết luận

Tái cấu trúc này giúp H-Music có:

- Code maintainable và scalable hơn
- Developer experience tốt hơn
- Performance tối ưu với caching
- Error handling nhất quán
- Type safety đầy đủ

Tất cả API calls mới nên sử dụng pattern này thay vì fetch trực tiếp.
