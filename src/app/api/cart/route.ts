import { NextRequest } from 'next/server'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(_request: NextRequest) {
  // Return empty cart state
  return Response.json({
    items: [],
    total: 0,
    itemCount: 0,
    currency: 'NGN'
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Basic validation
    if (!body.product_id || !body.name || !body.price) {
      return Response.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // For now, just return success - full implementation would integrate with cart context
    return Response.json({
      items: [{
        id: body.product_id,
        product_id: body.product_id,
        name: body.name,
        price: body.price,
        quantity: body.quantity || 1,
        image_url: body.image_url || ''
      }],
      total: (body.price || 0) * (body.quantity || 1),
      itemCount: body.quantity || 1,
      currency: 'NGN'
    })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_error) {
    return Response.json(
      { error: 'Invalid request body' },
      { status: 400 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const productId = searchParams.get('product_id')
  const clearAll = searchParams.get('all')

  if (clearAll === 'true') {
    return Response.json({
      items: [],
      total: 0,
      itemCount: 0,
      currency: 'NGN'
    })
  }

  if (productId) {
    return Response.json({
      items: [],
      total: 0,
      itemCount: 0,
      currency: 'NGN'
    })
  }

  return Response.json(
    { error: 'Invalid request' },
    { status: 400 }
  )
}
