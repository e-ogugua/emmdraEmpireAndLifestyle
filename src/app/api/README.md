# API Reference - Emmdra Empire

**Comprehensive API documentation for the Emmdra Empire SaaS platform.** This document covers all serverless API endpoints, their expected behavior, and integration patterns.

---

## API Architecture Overview

Our API follows **RESTful conventions** with Next.js 15 App Router patterns:
- **Server Components** for optimal performance
- **Route Handlers** for API endpoints
- **Middleware** for authentication and validation
- **Error Boundaries** for graceful error handling

**Base URL:** `https://emmdraempire.com/api/`

---

## API Endpoints

### Products API
**Purpose:** Product catalog management and inventory control.

#### GET /api/products
**Description:** Retrieve paginated product catalog with filtering and search.

**Query Parameters:**
```typescript
interface ProductsQuery {
  page?: number;        // Page number (default: 1)
  limit?: number;       // Items per page (default: 20, max: 100)
  category?: string;    // Product category filter
  search?: string;      // Text search in name/description
  sort?: 'name' | 'price' | 'created'; // Sort field
  order?: 'asc' | 'desc';              // Sort direction
  featured?: boolean;   // Featured products only
  inStock?: boolean;    // In-stock products only
}
```

**Response Format:**
```typescript
interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  in_stock: boolean;
  featured: boolean;
  created_at: string;
  updated_at: string;
}
```

**Example Request:**
```bash
curl "https://emmdraempire.com/api/products?category=fashion&limit=10&sort=price&order=asc"
```

**Rate Limiting:** 100 requests per minute per IP

---

#### GET /api/products/[id]
**Description:** Retrieve detailed product information by ID.

**Response Format:**
```typescript
interface ProductDetail extends Product {
  variants?: ProductVariant[];
  images?: string[];
  specifications?: Record<string, string>;
  related_products?: Product[];
}
```

**Example Request:**
```bash
curl "https://emmdraempire.com/api/products/prod_123"
```

---

#### POST /api/products (Admin Only)
**Description:** Create new product in catalog.

**Authentication:** Admin email required in headers.

**Request Body:**
```typescript
interface CreateProductRequest {
  name: string;
  description: string;
  short_description: string;
  price: number;
  image_url: string;
  category: string;
  in_stock: boolean;
  featured: boolean;
}
```

**Response:** Created product object with generated ID.

---

### Cart API
**Purpose:** Shopping cart management with persistent state.

#### GET /api/cart
**Description:** Retrieve current user's cart contents.

**Response Format:**
```typescript
interface CartResponse {
  items: CartItem[];
  total: number;
  itemCount: number;
  currency: string;
}

interface CartItem {
  id: string;
  product_id: string;
  name: string;
  price: number;
  quantity: number;
  image_url: string;
  max_quantity: number;
}
```

#### POST /api/cart
**Description:** Add item to cart or update existing item quantity.

**Request Body:**
```typescript
interface AddToCartRequest {
  product_id: string;
  quantity: number;
  variant_id?: string;
}
```

**Response:** Updated cart state.

#### DELETE /api/cart
**Description:** Remove item from cart or clear entire cart.

**Query Parameters:**
```typescript
interface ClearCartQuery {
  product_id?: string;  // Remove specific item
  all?: boolean;        // Clear entire cart
}
```

---

### Orders API
**Purpose:** Order processing and management.

#### POST /api/orders
**Description:** Create new order from cart contents.

**Authentication:** User session required.

**Request Body:**
```typescript
interface CreateOrderRequest {
  customer_info: {
    name: string;
    email: string;
    phone: string;
    address: {
      street: string;
      city: string;
      state: string;
      postal_code: string;
      country: string;
    };
  };
  payment_method: 'bank_transfer' | 'cash_on_delivery';
  notes?: string;
}
```

**Response Format:**
```typescript
interface OrderResponse {
  order_id: string;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered';
  total: number;
  estimated_delivery: string;
  tracking_number?: string;
}
```

#### GET /api/orders/[id] (Admin Only)
**Description:** Retrieve order details for admin management.

**Response Format:**
```typescript
interface OrderDetail {
  id: string;
  customer_info: CustomerInfo;
  items: OrderItem[];
  status: string;
  total: number;
  created_at: string;
  updated_at: string;
  payment_status: string;
  shipping_info?: ShippingInfo;
}
```

---

### Admin API
**Purpose:** Administrative operations and management.

#### GET /api/admin/stats
**Description:** Retrieve dashboard analytics and metrics.

**Authentication:** Admin email required.

**Response Format:**
```typescript
interface AdminStats {
  total_orders: number;
  total_revenue: number;
  total_products: number;
  total_users: number;
  recent_orders: Order[];
  top_products: Product[];
  revenue_chart: ChartData[];
  user_growth: ChartData[];
}
```

#### POST /api/admin/products
**Description:** Bulk product operations.

**Request Body:**
```typescript
interface BulkProductOperation {
  operation: 'create' | 'update' | 'delete';
  products: ProductData[];
}
```

---

### Content API
**Purpose:** Blog posts, workshops, and tutorial management.

#### GET /api/blog
**Description:** Retrieve blog posts with pagination.

**Query Parameters:**
```typescript
interface BlogQuery {
  page?: number;
  limit?: number;
  category?: string;
  author?: string;
  featured?: boolean;
}
```

**Response Format:**
```typescript
interface BlogResponse {
  posts: BlogPost[];
  total: number;
  page: number;
  limit: number;
  categories: string[];
}
```

#### GET /api/workshops
**Description:** Retrieve upcoming workshops and events.

**Response Format:**
```typescript
interface WorkshopsResponse {
  workshops: Workshop[];
  upcoming: Workshop[];
  categories: string[];
  locations: string[];
}
```

---

## Authentication & Security

### API Authentication
- **Public endpoints:** No authentication required
- **User endpoints:** Session-based authentication via cookies
- **Admin endpoints:** Email-based admin verification
- **Rate limiting:** Applied per endpoint with Redis backend

### Security Headers
```typescript
// Applied via Next.js middleware
const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Content-Security-Policy': "default-src 'self'",
};
```

### Input Validation
All API endpoints use **Zod schemas** for validation:
```typescript
const ProductSchema = z.object({
  name: z.string().min(1).max(100),
  price: z.number().positive(),
  category: z.enum(['fashion', 'beauty', 'lifestyle']),
  description: z.string().max(500),
});
```

---

## Performance Optimizations

### Caching Strategy
- **Redis** for session storage and rate limiting
- **Next.js Cache** for static API responses
- **Database indexing** for query optimization
- **CDN integration** for global performance

### Database Optimizations
```sql
-- Optimized indexes for common queries
CREATE INDEX idx_products_category_stock ON products(category, in_stock);
CREATE INDEX idx_orders_status_date ON orders(status, created_at);
CREATE INDEX idx_users_email ON users(email);
```

### Response Caching
```typescript
// Static responses cached for 5 minutes
export const revalidate = 300;

// Dynamic responses with ISR
export async function generateStaticParams() {
  // Generate static paths for popular products
}
```

---

## Testing API Endpoints

### Unit Testing
```typescript
describe('/api/products', () => {
  it('should return products with pagination', async () => {
    const response = await GET(new Request('/api/products?limit=10'));
    const data = await response.json();

    expect(data.products).toHaveLength(10);
    expect(data.total).toBeGreaterThan(0);
  });
});
```

### Integration Testing
```typescript
describe('Cart API Integration', () => {
  it('should persist cart across sessions', async () => {
    // Test cart persistence with database
  });
});
```

### Load Testing
```bash
# Test API performance under load
npx artillery run api-load-test.yml

# Monitor database performance
# Check response times <100ms P95
# Verify no memory leaks
```

---

## Monitoring & Analytics

### API Metrics
- **Response times** tracked per endpoint
- **Error rates** monitored with alerting
- **Throughput** measured per minute
- **Database queries** performance tracked

### Error Tracking
```typescript
// Structured error logging
logger.error('API Error', {
  endpoint: '/api/products',
  method: 'GET',
  status: 500,
  error: error.message,
  userAgent: request.headers.get('user-agent'),
});
```

### Performance Monitoring
- **Lighthouse CI** for API performance
- **New Relic/Sentry** for error tracking
- **Database query** performance monitoring
- **External API** response time tracking

---

## Development Guidelines

### API Development Standards
1. **Always use TypeScript** for type safety
2. **Implement proper error handling** with try/catch
3. **Add input validation** with Zod schemas
4. **Include comprehensive tests** for each endpoint
5. **Document with JSDoc** comments and examples

### Error Response Format
```typescript
interface APIError {
  error: {
    code: string;
    message: string;
    details?: Record<string, any>;
  };
  status: number;
}

const errorResponse: APIError = {
  error: {
    code: 'VALIDATION_ERROR',
    message: 'Invalid input data',
    details: { field: 'email', reason: 'Invalid format' }
  },
  status: 400
};
```

---

## Integration Examples

### Frontend Integration
```typescript
// React hook for API calls
const useProducts = () => {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: () => fetchProducts(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Usage in component
const { data: products, loading, error } = useProducts();
```

### External Integration
```typescript
// REST API integration
const fetchProducts = async (filters: ProductFilters) => {
  const params = new URLSearchParams(filters);
  const response = await fetch(`/api/products?${params}`);

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  return response.json();
};
```

---

**Emmdra Empire API v4.0 - Production Documentation**
**Developed by CEO (Chukwuka Emmanuel Ogugua)**

---

## API Changelog

### v4.0 (Current)
- **Turbopack optimization** for faster builds
- **Enhanced error handling** with structured logging
- **Improved caching** with Redis integration
- **Rate limiting** implementation
- **Admin API** endpoints for management

### v3.0
- **Next.js App Router** migration
- **TypeScript** strict mode implementation
- **Zod validation** schemas
- **Server Components** optimization

### v2.0
- **Supabase integration** for database
- **Authentication system** implementation
- **Cart persistence** with localStorage
- **Email notifications** setup

---

## Related Documentation

- **Main README** - Platform overview
- **Setup Guide** - Deployment instructions
- **Contributing Guide** - Development guidelines
- **Database Schema** - Database structure
