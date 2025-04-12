const room = {
    id: "1",
    image_url: "https://imgs.search.brave.com/70XyezWlgeaaGGXGTkjg7DjcK0O1wX7Ho6kDj0eGM0M/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTMx/MjQzOTg0NS9waG90/by9zdHlsaXNoLWxp/dmluZy1yb29tLWlu/dGVyaW9yLXdpdGgt/YmVhdXRpZnVsLWhv/dXNlLXBsYW50cy5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/c1V0NmpTYjFfTVpG/ZnlteUZtdXByR1lt/dHo1WFJvR3RDMmxV/c25Tcl95ND0",
    title: "a good room",
    capacity: 2,
    bed_type: "best type",
    size: "2",
    description: "very comfy beds",
    price: "200"   
}

const roomsData = [
    room,
    { ...room, id: "2" },
    { ...room, id: "3" },
    { ...room, id: "4" },
];

export default roomsData;