import { supabase } from '@/lib/supabase'

const sampleDIYTutorials = [
  {
    title: 'DIY Ankara Print Tote Bag',
    slug: 'diy-ankara-print-tote-bag',
    category: 'Fashion',
    difficulty: 'Beginner',
    estimated_time: '45 minutes',
    materials: [
      'Ankara fabric (1 yard)',
      'Canvas tote bag',
      'Fabric glue or sewing kit',
      'Scissors',
      'Iron',
      'Measuring tape',
      'Fabric marker'
    ],
    steps: [
      {
        title: 'Prepare Your Materials',
        description: 'Cut your Ankara fabric into a rectangle that covers the front of your tote bag. Make sure to add 1 inch extra on all sides for folding.',
        image_url: '/images/DIYAnkaraToteBag.png'
      },
      {
        title: 'Iron and Position',
        description: 'Iron your fabric piece to remove any wrinkles. Position it on the front of your tote bag and mark the edges with a fabric marker.',
        image_url: '/images/DIYAnkaraToteBag.png'
      },
      {
        title: 'Apply Adhesive',
        description: 'Apply fabric glue along the edges of your tote bag front panel. Work in small sections to avoid drying.',
        image_url: '/images/DIYAnkaraToteBag.png'
      },
      {
        title: 'Press and Secure',
        description: 'Carefully place your Ankara fabric over the glued area. Press firmly and let dry for 30 minutes.',
        image_url: '/images/DIYAnkaraToteBag.png'
      },
      {
        title: 'Finish the Edges',
        description: 'Fold the excess fabric over the edges and glue down for a clean finish. Let dry completely before use.',
        image_url: '/images/DIYAnkaraToteBag.png'
      }
    ],
    cover_image: '/images/DIYAnkaraToteBag.png',
    featured: true,
    published: true
  },
  {
    title: 'Natural Hair Oil Treatment',
    slug: 'natural-hair-oil-treatment',
    category: 'Beauty',
    difficulty: 'Beginner',
    estimated_time: '2 hours',
    materials: [
      'Coconut oil (1/2 cup)',
      'Jojoba oil (1/4 cup)',
      'Lavender essential oil (10 drops)',
      'Vitamin E oil (1 tsp)',
      'Glass jar with lid',
      'Small funnel',
      'Measuring cups'
    ],
    steps: [
      {
        title: 'Gather Ingredients',
        description: 'Measure out all your oils and essential oils. Make sure your glass jar is clean and dry.',
        image_url: '/images/NaturalHairOil.png'
      },
      {
        title: 'Mix Base Oils',
        description: 'Pour coconut oil and jojoba oil into your glass jar. Stir gently to combine.',
        image_url: '/images/NaturalHairOil.png'
      },
      {
        title: 'Add Scent',
        description: 'Add lavender essential oil and vitamin E oil. Stir thoroughly for 2-3 minutes.',
        image_url: '/images/NaturalHairOil.png'
      },
      {
        title: 'Let Settle',
        description: 'Close the jar and let the mixture sit for 24 hours to allow the scents to meld together.',
        image_url: '/images/NaturalHairOil.png'
      },
      {
        title: 'Store Properly',
        description: 'Store in a cool, dark place. Use 1-2 times per week for best results.',
        image_url: '/images/NaturalHairOil.png'
      }
    ],
    cover_image: '/images/NaturalHairOil.png',
    featured: true,
    published: true
  },
  {
    title: 'Beaded Statement Earrings',
    slug: 'beaded-statement-earrings',
    category: 'Accessories',
    difficulty: 'Intermediate',
    estimated_time: '90 minutes',
    materials: [
      'Earring hooks (2)',
      'Beading wire (20 gauge)',
      'Assorted beads (various sizes)',
      'Crimp beads (2)',
      'Wire cutters',
      'Round nose pliers',
      'Jump rings (2)'
    ],
    steps: [
      {
        title: 'Plan Your Design',
        description: 'Sketch your earring design on paper. Decide on bead colors, sizes, and arrangement pattern.',
        image_url: '/images/StatementEarrings.png'
      },
      {
        title: 'Cut Wire',
        description: 'Cut two pieces of beading wire, each about 6 inches long for comfortable earrings.',
        image_url: '/images/StatementEarrings.png'
      },
      {
        title: 'Add First Bead',
        description: 'String your first bead onto the wire and secure with a crimp bead using pliers.',
        image_url: '/images/StatementEarrings.png'
      },
      {
        title: 'Create Pattern',
        description: 'Continue adding beads in your chosen pattern. Mix sizes and colors for visual interest.',
        image_url: '/images/StatementEarrings.png'
      },
      {
        title: 'Finish and Attach',
        description: 'Add a jump ring to the top and attach to earring hooks. Repeat for the second earring.',
        image_url: '/images/StatementEarrings.png'
      }
    ],
    cover_image: '/images/StatementEarrings.png',
    featured: false,
    published: true
  },
  {
    title: 'Macrame Wall Hanging',
    slug: 'macrame-wall-hanging',
    category: 'Home Decor',
    difficulty: 'Intermediate',
    estimated_time: '3 hours',
    materials: [
      'Cotton macrame cord (3mm, 50 yards)',
      'Wooden dowel (24 inches)',
      'Scissors',
      'Measuring tape',
      'Comb or brush for fringes'
    ],
    steps: [
      {
        title: 'Cut Cords',
        description: 'Cut 20 pieces of macrame cord, each 8 feet long. Fold each piece in half for 40 working cords.',
        image_url: '/images/macrame-wall-hanging.jpg'
      },
      {
        title: 'Attach to Dowel',
        description: 'Attach cords to wooden dowel using lark\'s head knots. Space evenly across the dowel.',
        image_url: '/images/macrame-wall-hanging.jpg'
      },
      {
        title: 'Create Base Pattern',
        description: 'Use square knots to create the base pattern. Work in sections of 4 cords each.',
        image_url: '/images/macrame-wall-hanging.jpg'
      },
      {
        title: 'Add Decorative Knots',
        description: 'Incorporate different knot patterns like alternating square knots and spiral knots for texture.',
        image_url: '/images/macrame-wall-hanging.jpg'
      },
      {
        title: 'Finish Fringes',
        description: 'Trim all cord ends to the same length and brush out for a polished fringe look.',
        image_url: '/images/macrame-wall-hanging.jpg'
      }
    ],
    cover_image: '/images/macrame-wall-hanging.jpg',
    featured: false,
    published: true
  }
]

export async function seedDIYTutorials() {
  try {
    console.log('🌱 Seeding DIY tutorials...')

    // Clear existing tutorials (optional - remove if you want to keep existing data)
    await supabase.from('diy_tutorials').delete().neq('id', 0)

    // Insert sample tutorials
    const { data, error } = await supabase
      .from('diy_tutorials')
      .insert(sampleDIYTutorials)
      .select()

    if (error) {
      console.error('❌ Error seeding DIY tutorials:', error)
      return { success: false, error }
    }

    console.log('✅ Successfully seeded DIY tutorials:', data?.length || 0, 'tutorials')
    return { success: true, data }
  } catch (error) {
    console.error('❌ Error in seedDIYTutorials:', error)
    return { success: false, error }
  }
}
