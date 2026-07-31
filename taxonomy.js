/* ==========================================================================
   Today — curated activity taxonomy
   Categories, subcategories, and the curated item pool behind the mood-check
   flow and the Spin mechanic. Plain global declarations so this file works
   both as a browser <script> and as a Node require()-able module.
   ========================================================================== */

const SURPRISE_ID = 'surprise';

const TAXONOMY = [
  {
    id: 'fitness',
    label: 'Fitness & Move',
    emoji: '🏋️',
    icon: '<rect x="20" y="46" width="10" height="14" rx="3" fill="#37323e"/><rect x="70" y="46" width="10" height="14" rx="3" fill="#37323e"/><rect x="30" y="50" width="40" height="6" rx="3" fill="#6198ff"/>',
    subcategories: [
      {
        id: 'train-core',
        label: 'Train Core',
        items: [
          { title: '10-Minute Plank Ladder', description: 'Climb from 20 seconds to a minute in sets, resting as needed between rounds.' },
          { title: 'Bodyweight Ab Circuit', description: 'Crunches, leg raises, and bicycle kicks in a 15-minute round on a yoga mat.' },
          { title: 'Sit-Up Challenge', description: 'See how many clean sit-ups you can rack up in three timed minutes.' },
          { title: 'Russian Twists with a Water Bottle', description: 'Use a filled bottle as a makeshift weight for a rotating core burn.' },
          { title: 'Hollow Body Hold Practice', description: 'A gymnastics staple that builds serious core strength in short bursts.' },
          { title: 'Dead Bug Drill', description: 'A slow, controlled move that\'s gentler on the back than sit-ups but still works.' },
          { title: 'Mountain Climbers Intervals', description: '30 seconds on, 15 seconds off, repeated for a sweaty 10-minute core session.' },
          { title: 'Follow a Free Core Workout Video', description: 'No equipment, no gym — just a mat and 15 minutes of guided core work.' },
          { title: 'Side Plank Series', description: 'Work both obliques with timed holds on each side, no equipment needed.' },
          { title: 'Pilates Roll-Up Practice', description: 'A slow, controlled core move borrowed from Pilates — harder than it looks.' }
        ]
      },
      {
        id: 'train-upper',
        label: 'Train Upper',
        items: [
          { title: 'Push-Up Pyramid', description: 'Climb from 1 to 10 and back down, resting only when you need to.' },
          { title: 'Resistance Band Arm Circuit', description: 'A cheap band and 15 minutes cover shoulders, biceps, and triceps.' },
          { title: 'Wall Handstand Practice', description: 'Build shoulder strength and balance against a wall, a few minutes at a time.' },
          { title: 'Dip Session on a Park Bench', description: 'Free equipment — any sturdy bench works for a solid triceps burner.' },
          { title: 'Pull-Up Bar Session at a Playground', description: 'Most neighbourhood playgrounds have a bar — great for a free back workout.' },
          { title: 'Water Bottle Shoulder Press Set', description: 'Two filled bottles double as light dumbbells for a home shoulder session.' },
          { title: 'Follow a Free Upper-Body Workout Video', description: 'A guided 20-minute session that covers arms, chest, and back at home.' },
          { title: 'Towel Rows at Home', description: 'Loop a towel around a sturdy door handle for a makeshift back workout.' },
          { title: 'Diamond Push-Up Challenge', description: 'A tighter hand position that shifts the focus onto your triceps.' },
          { title: 'Arm Circuit with a Backpack', description: 'Load a backpack with books for an improvised weighted upper-body session.' }
        ]
      },
      {
        id: 'train-lower',
        label: 'Train Lower',
        items: [
          { title: 'Bodyweight Squat Ladder', description: 'Climb from 10 to 100 squats in manageable sets throughout the day.' },
          { title: 'Lunges Around the Living Room', description: 'Walking lunges up and down a hallway — no equipment, just space.' },
          { title: 'Wall Sit Challenge', description: 'Hold the position against a wall and see how long you can last.' },
          { title: 'Glute Bridge Set', description: 'A mat and 10 minutes are all you need to fire up your glutes.' },
          { title: 'Stair Step-Up Session', description: 'Use the nearest staircase for weighted step-ups using your own bodyweight.' },
          { title: 'Follow a Free Lower-Body Workout Video', description: 'A guided leg day at home — squats, lunges, and calf raises included.' },
          { title: 'Calf Raise Ladder', description: 'Simple but effective — do sets throughout the day while brushing your teeth or waiting for the kettle.' },
          { title: 'Single-Leg Balance and Squat Drill', description: 'Builds strength and stability at the same time, no equipment needed.' },
          { title: 'Jump Squat Intervals', description: 'Add explosive power to your leg day with timed jump squat sets.' },
          { title: 'Resistance Band Leg Circuit', description: 'A cheap band adds resistance to squats and lateral walks at home.' }
        ]
      },
      {
        id: 'cardio',
        label: 'Cardio',
        items: [
          { title: '10-Minute HIIT', description: 'A quick full-body burner you can do on the living room floor, no equipment needed.' },
          { title: 'Skip Rope for 15 Minutes', description: 'Old-school cardio that fits in a hallway and gets your heart rate up fast.' },
          { title: 'Jog Around the Nearest Park', description: 'No plan needed — just lace up and go at your own pace.' },
          { title: '20-Minute Dance Cardio Video', description: 'Follow along to a free video and turn your room into a mini dance floor.' },
          { title: 'Stair Climb Session', description: 'Find the nearest staircase and go up and down for 10 rounds.' },
          { title: 'Shadow Boxing', description: 'Throw combos to a playlist for 15 minutes, no gloves required.' },
          { title: 'Bike Around the Block', description: 'A loose, low-pressure ride just to get moving and feel the wind.' },
          { title: 'Jumping Jacks Ladder', description: 'Climb from 10 to 100 jumping jacks in sets, resting as needed.' },
          { title: 'Brisk Walk with Music', description: 'Pick a hype playlist and walk fast enough to break a light sweat.' },
          { title: 'Burpee Challenge', description: 'See how many clean burpees you can do in 5 minutes.' }
        ]
      },
      {
        id: 'yoga-stretch',
        label: 'Yoga/Stretch',
        items: [
          { title: 'Follow a Free 20-Minute Yoga Video', description: 'A guided flow you can do on a mat at home, no studio needed.' },
          { title: 'Morning Sun Salutation Sequence', description: 'A gentle set of poses to loosen up and wake up the body.' },
          { title: 'Full-Body Stretch Routine', description: 'Ten minutes of static stretches to unwind tight shoulders, hips, and hamstrings.' },
          { title: 'Try a Restorative Yoga Class', description: 'Slow, supported poses held longer — good for a low-energy day.' },
          { title: 'Foam Rolling Session', description: 'Roll out tight muscles at home while catching up on a show.' },
          { title: 'Attend a Drop-In Yoga Studio Class', description: 'No commitment needed — just show up with a mat or rent one.' },
          { title: 'Desk Stretch Break', description: 'A five-minute stretch sequence you can do right at your desk.' },
          { title: 'Try Yin Yoga for Deep Stretching', description: 'Long, passive holds that target connective tissue rather than muscle.' },
          { title: 'Evening Wind-Down Stretch', description: 'A short, calming sequence to do before bed to ease into sleep.' },
          { title: 'Hip-Opener Stretch Sequence', description: 'Targeted stretches for hips tight from sitting all day.' }
        ]
      },
      {
        id: 'bouldering',
        label: 'Bouldering/Climbing Gym',
        items: [
          { title: 'Try a Beginner Bouldering Session', description: 'No harness needed — just chalk up and try low walls at your own pace.' },
          { title: 'Book a Climbing Gym Day Pass', description: 'Most gyms rent shoes, so you can walk in with nothing and still climb.' },
          { title: 'Take an Intro to Bouldering Class', description: 'A short lesson on technique before you\'re set loose on the walls.' },
          { title: 'Try Auto-Belay Top-Rope Climbing', description: 'A safer intro to roped climbing that doesn\'t need a partner.' },
          { title: 'Bouldering with a Friend', description: 'Spot each other and swap tips on problems you\'re both stuck on.' },
          { title: 'Attempt a New Grade Level', description: 'Push one grade higher than your comfort zone and see how it goes.' },
          { title: 'Climbing Gym Social Night', description: 'Some gyms run casual meetups — good for solo climbers to find partners.' },
          { title: 'Try Outdoor Bouldering', description: 'A few local spots have real rock for climbers ready to go outdoors.' },
          { title: 'Work on Climbing Technique Drills', description: 'Footwork and balance drills that make hard problems feel easier.' },
          { title: 'Climb Until Your Arms Give Out', description: 'No plan, just laps on easy problems until you\'re properly worn out.' }
        ]
      },
      {
        id: 'cycling',
        label: 'Cycling',
        items: [
          { title: 'Rent a Bike for a Park Loop', description: 'No bike needed — rental stations make this an easy spontaneous outing.' },
          { title: 'Cycle Along a Coastal Path', description: 'Flat, scenic, and breezy — an easy ride with a view the whole way.' },
          { title: 'Explore a New Park Connector by Bike', description: 'Pick a route you\'ve never done and just follow it end to end.' },
          { title: 'Sunset Cycling Route', description: 'Time your ride to catch the sky changing colour along the way.' },
          { title: 'Group Cycling Meetup', description: 'Join a casual weekend riding group instead of going solo.' },
          { title: 'Night Cycling Ride', description: 'Cooler air and quieter paths make for a different kind of ride.' },
          { title: 'Cycle to a Café You\'ve Never Been To', description: 'Combine the ride with a reward — coffee at the finish line.' },
          { title: 'Try a Longer Distance Ride', description: 'Push past your usual loop and see how far you can comfortably go.' },
          { title: 'Family-Friendly Cycling Loop', description: 'A flat, easy path good for a slower, low-pressure ride.' },
          { title: 'Bike Maintenance and Test Ride', description: 'Pump the tyres, oil the chain, and take it out to check everything\'s smooth.' }
        ]
      },
      {
        id: 'badminton',
        label: 'Badminton/Sports Court',
        items: [
          { title: 'Book a Badminton Court for an Hour', description: 'Grab a friend, rent rackets if you don\'t own any, and just play.' },
          { title: 'Casual Badminton at a Community Centre', description: 'Courts here are often cheaper than private sports halls.' },
          { title: 'Try a Beginner Badminton Lesson', description: 'A short session on form and footwork before you rally on your own.' },
          { title: 'Book a Basketball Half-Court Session', description: 'Shoot around or run a casual game with whoever shows up.' },
          { title: 'Play a Pickup Football Game', description: 'Check for open community games — no team commitment required.' },
          { title: 'Book a Squash Court', description: 'A fast, sweaty sport that only needs two people and a court.' },
          { title: 'Table Tennis at a Community Centre', description: 'Many centres have free or cheap tables — just bring your own bat.' },
          { title: 'Volleyball at a Beach Court', description: 'Casual beach volleyball courts are often open for walk-ins.' },
          { title: 'Tennis Practice Against a Wall', description: 'No partner needed — a practice wall is enough to work on your swing.' },
          { title: 'Join a Casual Sports Club Session', description: 'Many clubs run drop-in nights for badminton, futsal, or basketball.' }
        ]
      },
      {
        id: 'dance',
        label: 'Dance',
        items: [
          { title: 'Follow a Free K-Pop Dance Tutorial', description: 'Learn a short routine from a video, no studio or partner needed.' },
          { title: 'Try a Drop-In Dance Class', description: 'Many studios let you pay per class instead of committing to a package.' },
          { title: 'Freestyle Dance Session at Home', description: 'Put on a playlist and just move — no choreography required.' },
          { title: 'Learn a TikTok Dance Trend', description: 'Quick, fun, and shareable if you want to post it after.' },
          { title: 'Try a Salsa or Bachata Social', description: 'Beginner-friendly socials often teach basic steps before the dancing starts.' },
          { title: 'Zumba Class at a Community Centre', description: 'A high-energy cardio dance class that doesn\'t require any experience.' },
          { title: 'Hip-Hop Dance Workshop', description: 'A one-off class to learn choreography without a long-term commitment.' },
          { title: 'Line Dancing Session', description: 'Easier to pick up than it looks, and always danced in a group.' },
          { title: 'Practice a Routine in Front of a Mirror', description: 'Work on cleaning up a routine you already half-know.' },
          { title: 'Dance Cardio Livestream Class', description: 'Join a free live class online and dance along in real time.' }
        ]
      }
    ]
  },
  {
    id: 'food',
    label: 'Food & Drink',
    emoji: '🍜',
    icon: '<path d="M-16,-4 h32 v18 a16,16 0 0 1 -16,16 a16,16 0 0 1 -16,-16 Z" fill="#37323e" transform="translate(50,54)"/><path d="M16,2 h8 a8,8 0 0 1 0,16 h-6" fill="none" stroke="#37323e" stroke-width="4" transform="translate(50,54)"/>',
    subcategories: [
      {
        id: 'restaurant',
        label: 'Restaurant',
        items: [
          { title: 'Try a Restaurant You\'ve Been Meaning To', description: 'That place on your saved list — finally go before it slips your mind again.' },
          { title: 'Order the Chef\'s Recommendation', description: 'Skip the usual and let the menu surprise you for once.' },
          { title: 'Try a Cuisine You\'ve Never Had', description: 'Pick a cuisine that\'s new to you and go in with an open mind.' },
          { title: 'Weekday Lunch Set Deal', description: 'Many restaurants offer cheaper set lunches on weekdays — good value, less crowded.' },
          { title: 'Solo Dinner at the Bar Counter', description: 'No reservation needed, and counter seats often mean faster service.' },
          { title: 'Try a New Opening Nearby', description: 'Fresh menus tend to be at their best in the first few months.' },
          { title: 'Revisit an Old Favourite', description: 'Sometimes the best plan is going back to what you already know is good.' },
          { title: 'Omakase-Style Tasting Menu', description: 'Let the kitchen decide the courses for a no-decisions kind of meal.' },
          { title: 'Try a Hole-in-the-Wall Spot', description: 'The unassuming places are often where the best food hides.' },
          { title: 'Book a Table for a Celebration', description: 'No occasion needed — treat an ordinary day like a small one.' }
        ]
      },
      {
        id: 'cafe-hopping',
        label: 'Café Hopping',
        items: [
          { title: 'Try a New Specialty Coffee Shop', description: 'Order the house special and see what the roaster is proud of.' },
          { title: 'Café Hop Two Neighbouring Spots', description: 'Coffee at one café, dessert at another — a slow half-day plan.' },
          { title: 'Visit a Plant-Filled Café', description: 'Good for a photo and a calmer, greener kind of coffee break.' },
          { title: 'Try a Café with a View', description: 'Rooftop or window seats make an ordinary coffee feel like an outing.' },
          { title: 'Order an Off-Menu Coffee Creation', description: 'Ask the barista what they\'d make if there were no menu.' },
          { title: 'Try a Minimalist Third-Wave Café', description: 'Slower brews, quieter music, and coffee treated like a craft.' },
          { title: 'Café Work Session with a Cold Brew', description: 'Bring a laptop or book and treat the café as a change of office.' },
          { title: 'Visit a Themed or Concept Café', description: 'From cats to comics — cafés with a hook make the visit an activity in itself.' },
          { title: 'Try a Café\'s Seasonal Menu Item', description: 'Limited-time drinks and pastries are worth catching before they disappear.' },
          { title: 'Coffee and Pastry Pairing Stop', description: 'Ask the counter what pastry pairs best with today\'s brew.' }
        ]
      },
      {
        id: 'bubble-tea',
        label: 'Bubble Tea',
        items: [
          { title: 'Try a New Bubble Tea Brand', description: 'Skip your usual order and try a shop you haven\'t been to yet.' },
          { title: 'Order a Brown Sugar Boba Milk', description: 'The classic swirl-cup order, worth it just for the presentation.' },
          { title: 'Try Cheese Foam Tea', description: 'A salty-sweet topping that\'s grown into its own category of drink.' },
          { title: 'Customise Your Own Sugar and Ice Level', description: 'Dial in the exact sweetness and ice you actually want, for once.' },
          { title: 'Try a Fruit Tea Instead of Milk Tea', description: 'A lighter, fruitier order if milk tea\'s feeling too heavy today.' },
          { title: 'Order Taro Milk Tea', description: 'A purple, nutty classic that\'s easy to love on the first sip.' },
          { title: 'Try a Seasonal Limited Flavour', description: 'Check the board for a flavour that\'s only around for a few weeks.' },
          { title: 'Grass Jelly or Pudding Topping Upgrade', description: 'Swap your usual pearls for a different chewy topping.' },
          { title: 'Bubble Tea and a Walk', description: 'Grab a cup and turn a normal errand into a small outing.' },
          { title: 'Try a QQ or Crystal Boba Variation', description: 'A different chew and clarity from the usual black tapioca pearls.' }
        ]
      },
      {
        id: 'street-food',
        label: 'Street Food/Hawker',
        items: [
          { title: 'Hawker Centre Food Crawl', description: 'Split small orders across three or four stalls instead of one big plate.' },
          { title: 'Try a Stall You\'ve Always Walked Past', description: 'The one with the long queue is usually long for a reason.' },
          { title: 'Order the Stall\'s Signature Dish', description: 'Ask the auntie or uncle what they\'re known for and get that.' },
          { title: 'Late-Night Hawker Run', description: 'Some stalls only really come alive after the dinner crowd clears.' },
          { title: 'Try a Different Hawker Centre Across Town', description: 'Every neighbourhood has its own specialties worth crossing town for.' },
          { title: 'Mix-and-Match Zi Char Order', description: 'Get a small group together and order enough dishes to share.' },
          { title: 'Try Street Snacks from a Night Stall', description: 'Skip the sit-down meal and just graze on snacks as you walk.' },
          { title: 'Weekend Wet Market Breakfast', description: 'Early risers get the freshest kopi and the shortest queues.' },
          { title: 'Try a Fusion Hawker Dish', description: 'Some stalls mash up cuisines in ways worth trying at least once.' },
          { title: 'Hawker Dessert Stop', description: 'End the meal with an old-school stall dessert instead of a café one.' }
        ]
      },
      {
        id: 'desserts',
        label: 'Dessert/Sweets',
        items: [
          { title: 'Try a New Ice Cream Flavour', description: 'Skip your usual scoop and pick whatever sounds the strangest.' },
          { title: 'Visit a Dessert-Only Café', description: 'A menu with nothing but sweets means no decision fatigue about mains.' },
          { title: 'Order a Molten Chocolate Cake', description: 'Warm, gooey, and best shared — or not, no judgment.' },
          { title: 'Try Traditional Local Desserts', description: 'Chendol, tau huay, or ice kachang — old-school and always satisfying.' },
          { title: 'Visit a Soft Serve Specialty Shop', description: 'Rotating flavours mean there\'s usually something new to try.' },
          { title: 'Try a Croissant or Pastry from a New Bakery', description: 'Fresh out of the oven is worth the earlier trip.' },
          { title: 'Order a Waffle with All the Toppings', description: 'Go overboard on toppings just this once.' },
          { title: 'Try Mochi or Japanese-Style Sweets', description: 'Small, chewy, and easy to sample a few different flavours.' },
          { title: 'Bingsu or Shaved Ice Stop', description: 'A shareable mountain of shaved ice, good for splitting with someone.' },
          { title: 'Visit a Cheesecake Specialty Shop', description: 'Try a style you haven\'t had — basque, Japanese, or classic New York.' }
        ]
      },
      {
        id: 'supper',
        label: 'Supper Spot',
        items: [
          { title: 'Late-Night Zi Char Run', description: 'Order a couple of dishes to share at a spot that stays open late.' },
          { title: 'Try a 24-Hour Kopitiam', description: 'Good for a coffee, a snack, and people-watching at odd hours.' },
          { title: 'Midnight Porridge Run', description: 'Light, warm, and comforting when it\'s too late for anything heavier.' },
          { title: 'Late-Night Ramen Bowl', description: 'Some ramen shops stay open past midnight for exactly this craving.' },
          { title: 'Supper at a 24-Hour Fast Food Spot', description: 'No plan, no reservation — just walk in whenever hunger hits.' },
          { title: 'Grab Late-Night Skewers or Satay', description: 'Some stalls specialise in exactly this kind of late-night order.' },
          { title: 'Try a Late-Night Dim Sum Spot', description: 'A rarer find, but worth seeking out for something different at midnight.' },
          { title: 'Order Delivery and Watch Something', description: 'Sometimes the best supper plan is staying on the couch.' },
          { title: 'Late-Night Toast and Kaya Butter Set', description: 'A classic, simple order that hits at any hour.' },
          { title: 'Supper Run with Friends After a Night Out', description: 'The unplanned stop that always ends up being the best part.' }
        ]
      },
      {
        id: 'cook-bake',
        label: 'Cook/Bake at Home',
        items: [
          { title: 'Bake a Tiramisu', description: 'No-bake layers of coffee-soaked biscuits and mascarpone — impressive with minimal effort.' },
          { title: 'Make Fresh Pasta from Scratch', description: 'Just flour, eggs, and a rolling pin turn into dinner.' },
          { title: 'Bake Chocolate Chip Cookies', description: 'A classic that fills the kitchen with the best smell in the house.' },
          { title: 'Try a New Curry Recipe', description: 'Pick a cuisine you haven\'t cooked before and follow along with a video.' },
          { title: 'Make Bubble Tea at Home', description: 'Boil tapioca pearls and brew your own milk tea, cheaper than the shop.' },
          { title: 'Bake Banana Bread', description: 'The perfect use for those bananas going brown on the counter.' },
          { title: 'Make Homemade Pizza', description: 'Stretch your own dough and pile on whatever toppings you\'re craving.' },
          { title: 'Whip Up a Fruit Smoothie Bowl', description: 'Blend, pour, and decorate with toppings for a five-minute treat.' },
          { title: 'Try Making Dumplings from Scratch', description: 'Fold your own and freeze extras for later.' },
          { title: 'Bake a Batch of Muffins', description: 'Mix, scoop, bake — ready in under 30 minutes.' }
        ]
      }
    ]
  },
  {
    id: 'new-experience',
    label: 'New Experience',
    emoji: '✨',
    icon: '<path d="M-22,14 L-4,-16 L8,4 L16,-8 L26,14 Z" fill="#37323e" transform="translate(50,50)"/><circle cx="46" cy="24" r="4" fill="#6198ff"/>',
    subcategories: [
      {
        id: 'rock-climbing',
        label: 'Rock Climbing',
        items: [
          { title: 'Try Outdoor Rock Climbing', description: 'A guided first trip to real rock, ropes and gear usually provided.' },
          { title: 'Book a Beginner Top-Rope Session', description: 'An instructor handles the safety setup while you focus on climbing.' },
          { title: 'Try Lead Climbing for the First Time', description: 'A course that teaches you to clip your own rope as you go.' },
          { title: 'Climbing Gym Trial Session', description: 'A one-off pass to see if the sport clicks before committing further.' },
          { title: 'Try a Multi-Pitch Climbing Intro', description: 'A longer outdoor route split into stages for climbers ready to level up.' },
          { title: 'Night Climbing Session', description: 'Some gyms run headlamp sessions for a different kind of challenge.' },
          { title: 'Climbing with a Small Group Class', description: 'Learn alongside other beginners instead of going in solo.' },
          { title: 'Try Speed Climbing', description: 'A timed sprint up a standardised wall — fun to compete with friends.' },
          { title: 'Book an Abseiling Session', description: 'Rappel down a real height for a rush without the climb up.' },
          { title: 'Try Via Ferrata', description: 'A protected climbing route with fixed cables — an easier intro to exposure.' }
        ]
      },
      {
        id: 'ice-skating',
        label: 'Ice Skating',
        items: [
          { title: 'Try Ice Skating for the First Time', description: 'Rent skates on the spot and expect to wobble for the first ten minutes.' },
          { title: 'Book a Beginner Ice Skating Lesson', description: 'A short lesson on balance and stopping before you\'re set free on the rink.' },
          { title: 'Casual Skate Session with Friends', description: 'No lesson needed — just laps around the rink at your own pace.' },
          { title: 'Try Ice Skating Hockey Drills', description: 'A step up from casual skating if you already know the basics.' },
          { title: 'Skate During Off-Peak Hours', description: 'Quieter rinks mean more space to actually practice without dodging people.' },
          { title: 'Try Figure Skating Basics', description: 'Learn a spin or a simple glide beyond just moving forward.' },
          { title: 'Ice Skating Date Session', description: 'A classic low-pressure outing that doesn\'t require much planning.' },
          { title: 'Skate to a Themed Rink Night', description: 'Some rinks run music or costume nights worth timing your visit around.' },
          { title: 'Try Skating Without Holding the Rail', description: 'A small personal challenge if you\'ve already got the basics down.' },
          { title: 'Group Skating Session', description: 'Get a group together and split the rental cost of the outing.' }
        ]
      },
      {
        id: 'kayaking',
        label: 'Kayaking',
        items: [
          { title: 'Try a Beginner Kayaking Session', description: 'Rent a kayak and paddle a calm stretch of water at your own pace.' },
          { title: 'Book a Guided Mangrove Kayak Tour', description: 'A guide leads you through quiet waterways, no experience needed.' },
          { title: 'Sunset Kayaking Session', description: 'Time your paddle to catch the sky changing colour over the water.' },
          { title: 'Try Stand-Up Paddleboarding Instead', description: 'A different kind of balance challenge on the same rented equipment.' },
          { title: 'Kayak with a Friend in a Double Kayak', description: 'Split the paddling and the cost with a two-person kayak.' },
          { title: 'Try Sea Kayaking', description: 'A step up from calm inland water for a more open-water feel.' },
          { title: 'Kayak Fishing Trial', description: 'Combine paddling with a rod for a slower, quieter kind of outing.' },
          { title: 'Try a Kayak Polo Session', description: 'A playful, competitive twist on the sport if you already know the basics.' },
          { title: 'Morning Kayak Before the Wind Picks Up', description: 'Early sessions tend to be calmer and cooler on the water.' },
          { title: 'Kayak Camping Day Trip', description: 'Paddle out to a quiet spot and just stay there for a while.' }
        ]
      },
      {
        id: 'escape-room',
        label: 'Escape Room',
        items: [
          { title: 'Book a Mystery-Themed Escape Room', description: 'Gather a few friends and race the clock to solve the puzzles.' },
          { title: 'Try a Horror-Themed Escape Room', description: 'For when you want your heart rate up along with the puzzle-solving.' },
          { title: 'Do a Heist-Themed Escape Room', description: 'Team up to crack codes and "steal" your way out.' },
          { title: 'Try a Beginner-Friendly Escape Room', description: 'A gentler intro if it\'s your first time, with easier puzzles.' },
          { title: 'Book a 2-Player Escape Room', description: 'Some rooms are built for pairs — good for a low-key date.' },
          { title: 'Try a Sci-Fi Escape Room', description: 'Space stations and time-travel plots for a different vibe.' },
          { title: 'Do an Outdoor/City Escape Game', description: 'Solve clues around real streets instead of a single room.' },
          { title: 'Try a Puzzle Hunt App Instead', description: 'Free alternative — solve a location-based puzzle trail on your phone.' },
          { title: 'Book a Detective-Themed Room', description: 'Piece together a case file before time runs out.' },
          { title: 'Try a Fantasy-Themed Escape Room', description: 'Dragons, spells, and riddles for a change of pace.' }
        ]
      },
      {
        id: 'adventurous',
        label: 'Something Adventurous',
        items: [
          { title: 'Try Indoor Skydiving', description: 'A wind tunnel gives you the free-fall feeling without the plane.' },
          { title: 'Book a Zipline Session', description: 'A short adrenaline burst that doesn\'t need any prior experience.' },
          { title: 'Try a High Ropes Course', description: 'Work through obstacles well above the ground, harnessed in the whole way.' },
          { title: 'Go Karting Session', description: 'Book a slot and race friends around an indoor or outdoor track.' },
          { title: 'Try Bungee Fitness or a Trampoline Park', description: 'A bouncy, low-commitment way to get your heart rate up.' },
          { title: 'Book a Flyboarding Trial', description: 'Water-propelled boots that let you hover above the surface — steep learning curve, big payoff.' },
          { title: 'Try Axe Throwing', description: 'A surprisingly satisfying way to blow off steam with friends.' },
          { title: 'Book a Wakeboarding Trial', description: 'A cable-pulled intro session, no boat or experience required.' },
          { title: 'Try Paintball or Laser Tag', description: 'A group activity that turns competitive fast — book a session and bring friends.' },
          { title: 'Book a Hot Air Balloon or Helicopter Ride', description: 'A splurge-y once-in-a-while way to see the city from above.' }
        ]
      }
    ]
  },
  {
    id: 'culture',
    label: 'Culture & Creative',
    emoji: '🎨',
    icon: '<path d="M-20,10 L0,-4 L20,10 Z" fill="#37323e" transform="translate(50,54)"/><rect x="30" y="64" width="40" height="6" fill="#37323e"/>',
    subcategories: [
      {
        id: 'photography-walk',
        label: 'Photography Walk',
        items: [
          { title: 'Golden Hour Photo Walk', description: 'Time a walk for the hour before sunset when the light does most of the work.' },
          { title: 'Street Photography Session', description: 'Wander a busy district and just capture whatever catches your eye.' },
          { title: 'Photograph a Heritage Neighbourhood', description: 'Old shophouses and murals make for an easy, walkable photo trail.' },
          { title: 'Try Film Photography for a Day', description: 'Borrow or buy a cheap film camera and shoot without checking the screen.' },
          { title: 'Macro Photography in a Garden', description: 'Get close to flowers and leaves for detail shots you\'d normally miss.' },
          { title: 'Night Photography Walk', description: 'City lights and long exposures make for a different kind of shoot.' },
          { title: 'Photograph Architecture Downtown', description: 'Look up — building lines and reflections make surprisingly good subjects.' },
          { title: 'Portrait Practice with a Friend', description: 'Trade turns being the subject and the photographer for an hour.' },
          { title: 'Try Smartphone-Only Photography', description: 'No fancy gear needed — just your phone and an eye for detail.' },
          { title: 'Photograph a Local Market', description: 'Colour, motion, and character everywhere you point the lens.' }
        ]
      },
      {
        id: 'movies',
        label: 'Movies',
        items: [
          { title: 'Catch a New Release at the Cinema', description: 'Check what\'s just opened and grab a weekday ticket for a quieter screening.' },
          { title: 'Watch a Classic Film You\'ve Never Seen', description: 'Pick a widely-loved film from before your time and finally watch it.' },
          { title: 'Try a Late-Night Movie Screening', description: 'Cheaper tickets and a near-empty theatre if you catch the last show.' },
          { title: 'Movie Marathon at Home', description: 'Pick a trilogy or a director\'s filmography and work through it in one sitting.' },
          { title: 'Watch a Foreign Film with Subtitles', description: 'Step outside your usual language or genre for something different.' },
          { title: 'Catch an Arthouse or Indie Screening', description: 'Smaller cinemas often run films that never make it to the big chains.' },
          { title: 'Solo Movie Date', description: 'No need to wait for company — pick your own seat and snack.' },
          { title: 'Watch a Documentary You Wouldn\'t Normally Pick', description: 'Something outside your usual interests, just to see what you learn.' },
          { title: 'Try a Movie Trivia Night', description: 'Some cinemas or bars run quiz nights themed around film.' },
          { title: 'Rewatch a Favourite on the Big Screen', description: 'Some cinemas do special re-releases — worth catching if one lines up.' }
        ]
      },
      {
        id: 'live-shows',
        label: 'Live Shows/Concerts',
        items: [
          { title: 'Catch a Local Band at a Small Venue', description: 'Cheaper tickets and a closer view than any arena show.' },
          { title: 'Watch an Open Mic Night', description: 'Free or low-cost, and you never know what act you\'ll catch.' },
          { title: 'Book Tickets to a Touring Concert', description: 'Check who\'s coming through town this month and grab a seat.' },
          { title: 'Watch a Stand-Up Comedy Show', description: 'A low-pressure night out that just needs you to show up and laugh.' },
          { title: 'Catch a Theatre Production', description: 'Local or touring shows both make for a proper night out.' },
          { title: 'Watch a Jazz Set at a Bar', description: 'Many bars run live jazz nights with no cover or a small one.' },
          { title: 'Attend a Musical', description: 'Bigger productions worth booking ahead for a proper evening out.' },
          { title: 'Catch a DJ Set or Club Night', description: 'A later-starting plan if you\'re more of a night owl.' },
          { title: 'Watch a Poetry Slam or Spoken Word Night', description: 'Small, intimate, and often free to attend.' },
          { title: 'Catch a Classical or Orchestral Performance', description: 'A different pace of live music, often in a beautiful venue.' }
        ]
      },
      {
        id: 'museum-art',
        label: 'Museum/Art Gallery',
        items: [
          { title: 'Visit Asian Civilisations Museum', description: 'Explore centuries of art and artefacts along the riverside.' },
          { title: 'Visit the National Gallery Singapore', description: 'Free admission windows make this an easy, low-cost outing.' },
          { title: 'Check Out ArtScience Museum', description: 'Rotating exhibits that mix art, science, and technology.' },
          { title: 'Explore the Peranakan Museum', description: 'A small, detailed look into Peranakan culture and heritage.' },
          { title: 'Visit the Singapore Art Museum', description: 'Contemporary Southeast Asian art in a compact, walkable space.' },
          { title: 'Drop by a Local Art Gallery Opening', description: 'Free wine, new artists, and zero pressure to buy anything.' },
          { title: 'Wander the National Museum of Singapore', description: 'A deep dive into the island\'s history, doable in an afternoon.' },
          { title: 'Visit the Red Dot Design Museum', description: 'A colourful look at design objects from around the world.' },
          { title: 'Check Out a University Art Exhibition', description: 'Student shows are often free and refreshingly experimental.' },
          { title: 'Visit a Photography Exhibition', description: 'Rotating shows from local and international photographers.' }
        ]
      },
      {
        id: 'pottery-craft',
        label: 'Pottery/Craft Workshop',
        items: [
          { title: 'Try a Beginner Pottery Wheel Class', description: 'A hands-on introduction to throwing clay, no experience needed.' },
          { title: 'Take a Hand-Building Ceramics Workshop', description: 'Shape clay by hand instead of on the wheel — easier for a first try.' },
          { title: 'Try a Candle-Making Workshop', description: 'Pick scents and pour your own candle to take home.' },
          { title: 'Take a Terrarium-Building Class', description: 'Layer soil, moss, and plants into a small glass world of your own.' },
          { title: 'Try a Macrame Workshop', description: 'Learn a few knots and leave with a wall hanging or plant holder.' },
          { title: 'Take a Leather Crafting Class', description: 'Make a small wallet or keychain in a single afternoon session.' },
          { title: 'Try a Glass Blowing or Fusing Workshop', description: 'A guided session where you shape your own glass piece.' },
          { title: 'Take a Jewellery-Making Class', description: 'Wire-wrap or bead your own piece to wear home the same day.' },
          { title: 'Try a Paint-Your-Own-Pottery Studio', description: 'No wheel skills needed — just glaze a pre-made piece and pick it up later.' },
          { title: 'Take a Floral Arrangement Workshop', description: 'Learn basic arranging and leave with a bouquet you made yourself.' }
        ]
      },
      {
        id: 'journaling',
        label: 'Journaling/Sketching',
        items: [
          { title: 'Start a Bullet Journal Layout', description: 'Sketch out a new weekly spread with whatever pens you have on hand.' },
          { title: 'Sketch at a Park Bench', description: 'Bring a notebook and draw whatever\'s in front of you, no pressure to be good.' },
          { title: 'Try Urban Sketching Downtown', description: 'Quick, loose sketches of buildings and street scenes as you walk.' },
          { title: 'Write a Stream-of-Consciousness Entry', description: 'Set a timer for ten minutes and just write without stopping to edit.' },
          { title: 'Try a Guided Journaling Prompt', description: 'Look up a prompt online and see where it takes your writing.' },
          { title: 'Sketch Your Coffee or Meal', description: 'A small, low-stakes subject to practice observational drawing.' },
          { title: 'Start a Gratitude Journal Entry', description: 'Three things, no more — a quick habit that\'s easy to keep up.' },
          { title: 'Try Watercolour Sketching Outdoors', description: 'A portable travel set makes this easy to do on a park bench.' },
          { title: 'Journal About Your Week So Far', description: 'A loose recap — no structure needed, just get it out of your head.' },
          { title: 'Sketch a Self-Portrait', description: 'Use a mirror or a photo and see how close you can get.' }
        ]
      }
    ]
  },
  {
    id: 'out-and-about',
    label: 'Out & About',
    emoji: '🧭',
    icon: '<path d="M-16,-2 h32 v34 h-32 Z" fill="#37323e" transform="translate(50,54)"/><path d="M-8,-2 a8,10 0 0 1 16,0" fill="none" stroke="#6198ff" stroke-width="4" transform="translate(50,54)"/>',
    subcategories: [
      {
        id: 'shopping',
        label: 'Shopping',
        items: [
          { title: 'Browse a Mall You Rarely Visit', description: 'No shopping list needed — just wander and see what catches your eye.' },
          { title: 'Window Shop Along a Shopping Street', description: 'A no-pressure walk through shopfronts with zero obligation to buy.' },
          { title: 'Try On Clothes You Wouldn\'t Normally Pick', description: 'Step outside your usual style just to see how it feels.' },
          { title: 'Visit a Bookstore and Browse', description: 'No agenda — just wander the shelves and see what jumps out.' },
          { title: 'Check Out a Local Designer Boutique', description: 'Small, independent shops often carry things you won\'t find in a mall.' },
          { title: 'Shop for a Gift for Someone Else', description: 'Browsing gets more fun when it\'s for someone other than yourself.' },
          { title: 'Visit an Electronics or Gadget Store', description: 'Play with the demo units even if you\'re not buying today.' },
          { title: 'Browse a Home Decor Store', description: 'Easy inspiration for your space, no purchase required to enjoy the browse.' },
          { title: 'Try a Sneaker or Streetwear Store', description: 'Check out the latest drops even if you\'re just looking.' },
          { title: 'Shop a Weekend Pop-Up Market', description: 'Independent sellers and one-off finds you won\'t see again.' }
        ]
      },
      {
        id: 'thrifting',
        label: 'Thrifting',
        items: [
          { title: 'Thrift for a Statement Piece', description: 'Dig through racks for the one item that makes the whole trip worth it.' },
          { title: 'Visit a New Thrift Store', description: 'Skip your usual spot and see what a different shop has in stock.' },
          { title: 'Thrift for Home Decor', description: 'Secondhand shops often have quirky pieces you won\'t find new.' },
          { title: 'Try a Vintage Clothing Store', description: 'Curated racks skip the digging that regular thrift stores need.' },
          { title: 'Thrift a Full Outfit Under a Budget', description: 'Set yourself a small budget and see what you can put together.' },
          { title: 'Hunt for Vintage Vinyl or CDs', description: 'A satisfying kind of browsing even if you don\'t own a turntable.' },
          { title: 'Thrift for Books', description: 'Secondhand bookstores are cheap and often have surprising finds.' },
          { title: 'Visit a Flea Market for Secondhand Finds', description: 'Weekend markets often mix thrifted clothes with random treasures.' },
          { title: 'Thrift Shopping with a Friend', description: 'A second opinion helps when you\'re on the fence about a piece.' },
          { title: 'Upcycle a Thrifted Find', description: 'Buy something plain and give it a small DIY makeover at home.' }
        ]
      },
      {
        id: 'sunset-watching',
        label: 'Sunset-Watching',
        items: [
          { title: 'Watch the Sunset from a Rooftop Bar', description: 'Order one drink and stay for the view, no reservation needed.' },
          { title: 'Catch the Sunset at the Beach', description: 'Bring a mat, watch the sky change colour over the water.' },
          { title: 'Sunset from a Park Hilltop', description: 'Higher ground for an unobstructed view, totally free.' },
          { title: 'Watch the Sunset from a Bridge', description: 'Water reflections make for an easy, scenic spot.' },
          { title: 'Sunset Picnic at the Waterfront', description: 'Pack snacks and claim a spot an hour before golden hour.' },
          { title: 'Watch the Sunset from a Ferry or Boat', description: 'A short ride out gives you an open, unblocked horizon.' },
          { title: 'Sunset from an Open-Air Café', description: 'Order a coffee and let the view do the rest.' },
          { title: 'Cycle to a Sunset Viewpoint', description: 'Combine light exercise with the reward of a good view.' },
          { title: 'Sunset Photography Walk', description: 'Bring your phone or camera and chase the best light.' },
          { title: 'Watch the Sunset from a Rooftop Garden', description: 'Many buildings have free public sky gardens worth checking.' }
        ]
      },
      {
        id: 'explore-neighborhood',
        label: 'Explore a New Neighborhood',
        items: [
          { title: 'Walk a Neighbourhood You\'ve Never Been To', description: 'Pick a random MRT stop and just wander from there.' },
          { title: 'Try the Local Coffee Shop of a New Area', description: 'Let the neighbourhood pick your coffee stop instead of your usual chain.' },
          { title: 'Explore a Heritage District on Foot', description: 'Old shophouses and side streets reward slow, aimless walking.' },
          { title: 'Take a Self-Guided Walking Tour', description: 'Look up a free route online and follow it at your own pace.' },
          { title: 'Eat Lunch Wherever Looks Busiest', description: 'Let a crowded stall in a new area be your recommendation.' },
          { title: 'Explore an Industrial Estate Turned Creative Hub', description: 'Old warehouses often hide studios, cafés, and small galleries.' },
          { title: 'Wander a Neighbourhood\'s Back Alleys', description: 'Murals, small shops, and quieter streets away from the main road.' },
          { title: 'Visit a New Neighbourhood\'s Weekend Market', description: 'Local markets are a fast way to get a feel for an area.' },
          { title: 'Explore an Up-and-Coming District', description: 'Areas mid-transformation often have the most interesting mix of old and new.' },
          { title: 'Take Public Transport to the End of the Line', description: 'Ride to the final stop and see whatever\'s around it.' }
        ]
      },
      {
        id: 'night-market',
        label: 'Night Market',
        items: [
          { title: 'Browse a Weekend Night Market', description: 'Street food, stalls, and people-watching all in one loop.' },
          { title: 'Try Night Market Snacks You\'ve Never Had', description: 'Order the stall with the strangest-sounding item on the sign.' },
          { title: 'Shop for Trinkets at a Night Market', description: 'Cheap, small finds that make for a fun, low-stakes browse.' },
          { title: 'Catch Live Entertainment at a Night Market', description: 'Some markets run performances or games alongside the stalls.' },
          { title: 'Night Market Food Crawl', description: 'Small bites from several stalls instead of one big meal.' },
          { title: 'Visit a Pasar Malam', description: 'A classic roaming night market with games, food, and toy stalls.' },
          { title: 'Try Games at a Night Market Stall', description: 'Ring toss, balloon darts — low stakes, nostalgic fun.' },
          { title: 'Night Market Photo Walk', description: 'Neon signs and busy stalls make for colourful, easy photos.' },
          { title: 'Shop for Fresh Produce at a Night Market', description: 'Some markets double as informal grocery runs after dark.' },
          { title: 'Night Market with a Group of Friends', description: 'Split orders across stalls and try more than you could alone.' }
        ]
      }
    ]
  },
  {
    id: 'chill-hangout',
    label: 'Chill & Hangout',
    emoji: '☕',
    icon: '<circle cx="50" cy="54" r="26" fill="none" stroke="#37323e" stroke-width="4"/><circle cx="50" cy="54" r="10" fill="#6198ff"/>',
    subcategories: [
      {
        id: 'board-game-cafe',
        label: 'Board Game Café',
        items: [
          { title: 'Try a New Board Game Café', description: 'Browse the shelf and let staff recommend something for your group size.' },
          { title: 'Play a Cooperative Board Game', description: 'Work together against the game instead of against each other.' },
          { title: 'Learn a Strategy Board Game', description: 'Ask staff to teach the rules of something you\'ve never played.' },
          { title: 'Board Game Café Date', description: 'A low-pressure setting that gives you something to do besides just talk.' },
          { title: 'Try a Party Card Game', description: 'Fast, funny, and easy to pick up even in a big group.' },
          { title: 'Board Game Night with Friends', description: 'Book a table and work through a few games over several hours.' },
          { title: 'Try a Deduction or Mystery Game', description: 'Games like these reward paying close attention to the table.' },
          { title: 'Solo Board Game Session', description: 'Some cafés stock single-player games if you\'re going alone.' },
          { title: 'Try a Trivia-Based Board Game', description: 'Good for groups who like a bit of friendly competition.' },
          { title: 'Board Game Café Marathon', description: 'Settle in for an afternoon and cycle through several games.' }
        ]
      },
      {
        id: 'karaoke',
        label: 'Karaoke/KTV',
        items: [
          { title: 'Book a KTV Room for the Afternoon', description: 'Off-peak hours are usually cheaper and less crowded.' },
          { title: 'Solo Karaoke Session', description: 'A private room means no audience — just you and the mic.' },
          { title: 'Karaoke with a Theme Night', description: 'Pick a decade or genre and only sing songs from that theme.' },
          { title: 'Try Songs Outside Your Usual Genre', description: 'Push past your go-to playlist for something you\'ve never sung.' },
          { title: 'Karaoke and Supper Combo', description: 'Many KTV spots run late — pair the session with a food run after.' },
          { title: 'Group Karaoke Night', description: 'Split a room cost across friends for a longer, cheaper session.' },
          { title: 'Karaoke Duet Challenge', description: 'Pick songs built for two voices and see how it goes.' },
          { title: 'Try a Karaoke App at Home', description: 'No booking needed — sing along to an app on your own couch.' },
          { title: 'Karaoke Birthday Celebration', description: 'A built-in party plan that needs almost no extra setup.' },
          { title: 'Late-Night Karaoke Session', description: 'Discounted rates after hours for a longer session on a smaller budget.' }
        ]
      },
      {
        id: 'bowling',
        label: 'Bowling',
        items: [
          { title: 'Book a Bowling Lane for an Hour', description: 'Rent shoes on the spot and just show up with friends.' },
          { title: 'Try Glow-in-the-Dark Bowling', description: 'Some alleys run blacklight sessions for a different vibe.' },
          { title: 'Bowling League Night Drop-In', description: 'Some alleys let walk-ins join casual league nights.' },
          { title: 'Bowling Date', description: 'A classic, low-pressure activity that gives you something to do together.' },
          { title: 'Bowling with a Handicap Challenge', description: 'Give the better bowler a harder rule to even things out.' },
          { title: 'Off-Peak Bowling Session', description: 'Weekday afternoons are usually cheaper and quieter.' },
          { title: 'Bowling and Arcade Combo Trip', description: 'Many alleys share a building with an arcade — do both in one visit.' },
          { title: 'Group Bowling Tournament', description: 'Split into teams and run a mini tournament across a few games.' },
          { title: 'Try Bowling Left-Handed (or Right)', description: 'A silly personal challenge if you\'ve bowled a hundred times before.' },
          { title: 'Bowling Birthday Party Session', description: 'An easy group activity that needs almost no extra planning.' }
        ]
      },
      {
        id: 'mini-golf',
        label: 'Mini Golf',
        items: [
          { title: 'Play a Round of Mini Golf', description: 'No skill required — just putt your way through eighteen quirky holes.' },
          { title: 'Try a Themed Mini Golf Course', description: 'Glow-in-the-dark or jungle-themed courses make it more than just golf.' },
          { title: 'Mini Golf Date', description: 'A low-pressure activity that keeps the conversation easy between holes.' },
          { title: 'Mini Golf with a Betting Twist', description: 'Loser buys drinks after — a bit of friendly stakes.' },
          { title: 'Group Mini Golf Outing', description: 'Split into pairs and keep score across a full round together.' },
          { title: 'Try an Outdoor Mini Golf Course', description: 'A change of scenery from the usual indoor blacklight setup.' },
          { title: 'Mini Golf and Food Combo Trip', description: 'Many courses sit near food courts — plan a meal around the round.' },
          { title: 'Mini Golf Speed Round', description: 'Race through the course as fast as possible instead of playing for score.' },
          { title: 'Mini Golf Birthday Outing', description: 'An easy group activity that works for almost any age.' },
          { title: 'Try Mini Golf Left-Handed', description: 'A silly self-imposed challenge if you\'ve played the course before.' }
        ]
      },
      {
        id: 'pool-billiards',
        label: 'Pool/Billiards',
        items: [
          { title: 'Play a Round of Pool at a Local Bar', description: 'Most bars have a table free to use with a drink order.' },
          { title: 'Book a Pool Table for the Evening', description: 'Some venues let you reserve a table for a set block of time.' },
          { title: 'Learn Proper Pool Technique', description: 'Watch a few tutorial videos, then practice your stance and cue grip.' },
          { title: 'Try Snooker Instead of Pool', description: 'A bigger table and smaller pockets for a tougher challenge.' },
          { title: 'Pool Tournament with Friends', description: 'Run a small bracket across a group and see who comes out on top.' },
          { title: 'Casual Pool and Drinks Night', description: 'A relaxed hangout format that doesn\'t need much planning.' },
          { title: 'Try Trick Shot Practice', description: 'Look up a few trick shots and see how many you can land.' },
          { title: 'Pool Date Night', description: 'An easy, low-pressure activity that gives you something to focus on together.' },
          { title: 'Play 8-Ball vs 9-Ball', description: 'Switch up the game variant if you\'re used to just one.' },
          { title: 'Solo Pool Practice Session', description: 'Some venues are quiet enough during the day to practice alone.' }
        ]
      },
      {
        id: 'arcade',
        label: 'Arcade',
        items: [
          { title: 'Try a New Arcade You\'ve Never Been To', description: 'Load up a card and see what machines the place has.' },
          { title: 'Rhythm Game Session', description: 'Dance or drum machines are a fun way to work up a light sweat.' },
          { title: 'Claw Machine Challenge', description: 'Set yourself a small budget and see what you can win.' },
          { title: 'Retro Arcade Cabinet Session', description: 'Some arcades keep classic cabinets around for old-school games.' },
          { title: 'Racing Game Tournament with Friends', description: 'Line up on the racing cabinets and run a few rounds head-to-head.' },
          { title: 'Photo Booth Session', description: 'Most arcades have a photo booth — a fun, cheap keepsake from the trip.' },
          { title: 'Try a VR Arcade Experience', description: 'Some arcades now run VR pods for a more immersive session.' },
          { title: 'Arcade Ticket Redemption Challenge', description: 'See how many tickets you can rack up and trade for a prize.' },
          { title: 'Fighting Game Cabinet Session', description: 'Challenge a stranger or a friend on a classic fighting cabinet.' },
          { title: 'Arcade Date Night', description: 'An easy, playful outing that doesn\'t need much planning.' }
        ]
      },
      {
        id: 'park-hangout',
        label: 'Park Hangout',
        items: [
          { title: 'Picnic at a Local Park', description: 'Pack snacks and a mat, and just claim a patch of grass.' },
          { title: 'Fly a Kite at an Open Field', description: 'Cheap, simple, and surprisingly satisfying once it catches the wind.' },
          { title: 'Frisbee Session with Friends', description: 'Grab a disc and an open field — no other equipment needed.' },
          { title: 'Read a Book on a Park Bench', description: 'A change of scenery from your desk or couch.' },
          { title: 'Bring a Ball for a Casual Kickabout', description: 'No teams needed — just pass it around with whoever\'s there.' },
          { title: 'Watch the World Go By on a Park Bench', description: 'No agenda — just sit and let some time pass outdoors.' },
          { title: 'Set Up a Hammock in the Park', description: 'A portable hammock turns any two trees into a lounge spot.' },
          { title: 'Park Yoga or Stretch Session', description: 'Bring a mat and use the open grass instead of a studio.' },
          { title: 'Bring Snacks and Watch the Sunset in the Park', description: 'Combine a picnic with the day\'s best light.' },
          { title: 'Walk the Park\'s Full Loop', description: 'No destination — just a lap or two to get some air.' }
        ]
      },
      {
        id: 'beach',
        label: 'Beach',
        items: [
          { title: 'Spend an Afternoon at the Beach', description: 'Bring a mat, some snacks, and no particular plan.' },
          { title: 'Beach Volleyball with Friends', description: 'Most beaches have open courts free to use if you bring a ball.' },
          { title: 'Walk the Length of the Beach', description: 'A simple, no-cost way to spend an hour by the water.' },
          { title: 'Beach Picnic at Sunset', description: 'Time your snacks to line up with the best light of the day.' },
          { title: 'Try Beach Frisbee or Paddle Ball', description: 'Cheap equipment and an open stretch of sand are all you need.' },
          { title: 'Build a Sandcastle', description: 'No age limit on this one — grab a bucket and get creative.' },
          { title: 'Beach Bonfire Evening', description: 'Check where it\'s allowed, then gather a small group for the evening.' },
          { title: 'Swim at the Beach', description: 'A free, simple way to cool off on a hot afternoon.' },
          { title: 'Beach Cleanup Walk', description: 'Bring a bag and pick up litter as you walk — good for the beach and you.' },
          { title: 'Watch the Sunrise at the Beach', description: 'An early start rewarded with a quiet, empty stretch of sand.' }
        ]
      },
      {
        id: 'petting-cafe',
        label: 'Petting Café',
        items: [
          { title: 'Visit a Cat Café', description: 'Order a drink and spend an hour surrounded by resident cats.' },
          { title: 'Try a Dog Café', description: 'A good fix if you love dogs but can\'t have one at home.' },
          { title: 'Visit a Rabbit or Small Pet Café', description: 'A quieter, gentler kind of animal café experience.' },
          { title: 'Try an Owl or Exotic Animal Café', description: 'A more unusual outing if you want something different from cats and dogs.' },
          { title: 'Bring a Friend to a Pet Café', description: 'More fun shared — someone to point out which animal is the friendliest.' },
          { title: 'Visit a Farm Animal Petting Zoo', description: 'Goats, sheep, and other animals for a more rural kind of visit.' },
          { title: 'Try a Hedgehog Café', description: 'A niche but calming experience for a slower kind of afternoon.' },
          { title: 'Photograph the Animals at a Pet Café', description: 'Bring a camera and treat the visit as a mini photo session too.' },
          { title: 'Pet Café Work Session', description: 'Some cafés are quiet enough to bring a laptop and get some work done.' },
          { title: 'Visit a Pet Café During Feeding Time', description: 'Time your visit to catch the animals at their most active.' }
        ]
      },
      {
        id: 'plant-shopping',
        label: 'Plant Shopping',
        items: [
          { title: 'Browse a Nursery for a New Plant', description: 'No list needed — just see what\'s healthy and catches your eye.' },
          { title: 'Visit a Garden Centre', description: 'Bigger than a nursery, with pots, soil, and tools alongside the plants.' },
          { title: 'Shop for a Low-Maintenance Succulent', description: 'A good starter plant if you\'re new to keeping things alive.' },
          { title: 'Browse a Plant Market or Pop-Up', description: 'Weekend markets often have independent growers with unusual stock.' },
          { title: 'Repot an Existing Plant', description: 'Buy a new pot and give a plant at home some fresh soil and space.' },
          { title: 'Shop for Herbs to Grow at Home', description: 'Basil or mint are easy starters for a small kitchen garden.' },
          { title: 'Visit a Bonsai Specialist', description: 'A slower, more meditative kind of plant browsing.' },
          { title: 'Shop for a Statement Indoor Plant', description: 'Something big enough to change the feel of a whole room.' },
          { title: 'Plant Swap with a Friend', description: 'Trade cuttings or spare plants instead of buying new ones.' },
          { title: 'Browse a Terrarium or Air Plant Shop', description: 'Low-maintenance options if you\'re short on space or sunlight.' }
        ]
      },
      {
        id: 'spa',
        label: 'Spa/Self-care',
        items: [
          { title: 'Book a Massage Session', description: 'An hour to unwind, no planning needed beyond the booking itself.' },
          { title: 'Try a Foot Reflexology Session', description: 'A cheaper, shorter self-care option than a full-body massage.' },
          { title: 'Book a Facial', description: 'A guided skincare reset that\'s hard to replicate at home.' },
          { title: 'Try a Sauna or Steam Room Session', description: 'Many gyms and spas offer walk-in access for a small fee.' },
          { title: 'Home Spa Night', description: 'Face masks, a warm bath, and no phone for an hour.' },
          { title: 'Book a Mani-Pedi Session', description: 'A small, easy treat that also gives you an hour to sit and relax.' },
          { title: 'Try a Hair Spa or Scalp Massage', description: 'An often-overlooked treatment that feels better than it sounds.' },
          { title: 'Book a Float Tank Session', description: 'An hour of sensory deprivation for total, uninterrupted quiet.' },
          { title: 'Try an Aromatherapy Massage', description: 'Scented oils add another layer to the usual massage session.' },
          { title: 'Book a Couples Spa Session', description: 'Side-by-side treatments for a shared, relaxing outing.' }
        ]
      },
      {
        id: 'reading-study-cafe',
        label: 'Reading/Study Café',
        items: [
          { title: 'Spend an Afternoon at a Quiet Café', description: 'Order a slow coffee and finally get through a chapter or two.' },
          { title: 'Try a Dedicated Study Café', description: 'Some cafés are built for focus, with plugs and good lighting at every seat.' },
          { title: 'Read at a Library Reading Room', description: 'Free, air-conditioned, and often underrated as a hangout spot.' },
          { title: 'Bring a Book to a Park Bench', description: 'Fresh air and a change of scenery from your desk.' },
          { title: 'Journal at a Cozy Café Corner', description: 'Order something warm and just write out your thoughts.' },
          { title: 'Visit a Bookstore Café', description: 'Browse new reads with a coffee in hand, no pressure to buy.' },
          { title: 'Do a Solo Study Session at a 24-Hour Café', description: 'Good for late-night focus when you need a change of scene.' },
          { title: 'Read Manga or Comics at a Themed Café', description: 'Some cafés have full shelves of comics to read while you sip.' },
          { title: 'Work Through a Puzzle Book at a Café', description: 'Crosswords or sudoku pair surprisingly well with coffee.' },
          { title: 'Have a Quiet Tea Session and Plan Your Week', description: 'Bring a planner and use the calm to get organised.' }
        ]
      }
    ]
  }
];

/**
 * Enrich a raw {title, description} item with its parent category/subcategory
 * metadata so callers don\'t need the full taxonomy to render or attribute it.
 */
function enrichItem(item, category, sub) {
  return {
    title: item.title,
    description: item.description,
    categoryId: category.id,
    categoryLabel: category.label,
    categoryIcon: category.icon,
    subcategoryId: sub.id,
    subcategoryLabel: sub.label
  };
}

/**
 * Look up the pool of items for a given category/subcategory pair.
 * Pass SURPRISE_ID as categoryId to get the full flattened pool across
 * every category and subcategory. Returns [] for any unknown id.
 */
function getPool(taxonomy, categoryId, subcategoryId) {
  if (categoryId === SURPRISE_ID) {
    return taxonomy.flatMap(category =>
      category.subcategories.flatMap(sub =>
        sub.items.map(item => enrichItem(item, category, sub))
      )
    );
  }
  const category = taxonomy.find(c => c.id === categoryId);
  if (!category) return [];
  const sub = category.subcategories.find(s => s.id === subcategoryId);
  if (!sub) return [];
  return sub.items.map(item => enrichItem(item, category, sub));
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { TAXONOMY, SURPRISE_ID, getPool };
}
