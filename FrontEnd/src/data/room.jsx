const room = {
  id: '1',
  image_url:
    'https://imgs.search.brave.com/70XyezWlgeaaGGXGTkjg7DjcK0O1wX7Ho6kDj0eGM0M/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTMx/MjQzOTg0NS9waG90/by9zdHlsaXNoLWxp/dmluZy1yb29tLWlu/dGVyaW9yLXdpdGgt/YmVhdXRpZnVsLWhv/dXNlLXBsYW50cy5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/c1V0NmpTYjFfTVpG/ZnlteUZtdXByR1lt/dHo1WFJvR3RDMmxV/c25Tcl95ND0',
  capacity: 2,
  details: [
    {
      item: 'bedroom',
      count: 2,
    },
    {
      item: 'bath',
      count: 1,
    },
    {
      item: 'king',
      count: 1,
    },
    {
      item: 'fulls',
      count: 2,
    },
    {
      item: 'sitting area',
      count: 1,
    },
    {
      item: 'TV',
      count: 1,
    },
    {
      item: "buttler's kitchen",
      count: 1,
    },
  ],
  area: 50,
  bed_type: 'suite',
  bed_count: 1,
  description:
    'Experience the perfect blend of luxury and heritage in our exclusive suite, designed to provide a sophisticated yet cozy retreat. Featuring Modern & Minimalist accents, this suite transports you to a world of elegance while ensuring modern comfort.',
  price: '12 000',
};

const roomsData = [
  room,
  { ...room, id: '2' },
  { ...room, id: '3' },
  { ...room, id: '4' },
];

export default roomsData;
