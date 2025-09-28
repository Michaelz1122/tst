import { NextRequest, NextResponse } from 'next/server'
import { getUserFromRequest } from '@/lib/admin-auth'

export async function GET(request: NextRequest) {
  try {
    const user = getUserFromRequest(request)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // In a real implementation, this would fetch from a database
    // For now, return sample content structure
    const content = {
      pages: [
        {
          id: 'home',
          title: 'Home Page',
          path: '/',
          sections: [
            { id: 'hero-title', type: 'hero', content: 'Michael Zahy - Performance Marketing Expert' },
            { id: 'hero-subtitle', type: 'hero', content: 'Strategic media buyer and performance marketing expert dedicated to helping businesses achieve exceptional results through data-driven digital advertising campaigns.' }
          ]
        }
      ]
    }

    return NextResponse.json(content)
  } catch (error) {
    console.error('Error fetching content:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = getUserFromRequest(request)
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { pageId, sectionId, content } = await request.json()

    if (!pageId || !sectionId || content === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // In a real implementation, this would save to a database
    // For now, just return success
    console.log(`Saving content for page ${pageId}, section ${sectionId}:`, content)

    return NextResponse.json({ 
      success: true, 
      message: 'Content saved successfully',
      data: { pageId, sectionId, content }
    })
  } catch (error) {
    console.error('Error saving content:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}