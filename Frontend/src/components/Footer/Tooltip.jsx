import { AnimatedTooltip } from "../ui/animated-tooltip"; // Adjust path as necessary

const people = [
  {
    id: 1,
    name: "Aurchi Chowdhury",
    designation: "UI/UX Designer",
    image:
      "https://scontent.fdac41-1.fna.fbcdn.net/v/t39.30808-6/431691890_1778519412643029_797081073241922593_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEGd34UqMHEekK2hYpi0gn2B2_Y6vLF-5UHb9jq8sX7lYgEBHGrCATZ9fxfxM1DxeYqv8CElNyLsIXGL0nimFiK&_nc_ohc=kAPVrr5hhy0Q7kNvgGw6TEH&_nc_ht=scontent.fdac41-1.fna&oh=00_AYDJwLVVV4wUn9KvCID8DA_9QuwlSQn6wbhmma-4wdX4wQ&oe=66FD75C4",
  },
  {
    id: 2,
    name: "Abrar Zahin Raihan",
    designation: "Researcher",
    image:
      "https://scontent.fdac41-1.fna.fbcdn.net/v/t39.30808-6/459564362_2130339747351148_8372501966788989276_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeHmzKFCNHiNzrSzuWzKu26M09k3YkBSD0XT2TdiQFIPRZu1hab6kmFrfVAFwbl2S0ttK6LZLbViPSZ9aom0sNjf&_nc_ohc=tLLPOmXjfosQ7kNvgFrdXVP&_nc_ht=scontent.fdac41-1.fna&_nc_gid=AmYAvwR_RlMIr12w-479_aZ&oh=00_AYBWXbxTeBwr6g5HXjJqI2vLVrhXt8ay5heXxocEHnrQhw&oe=66FD5593",
  },
  {
    id: 3,
    name: "Ruwad Naswan",
    designation: "Data Scientist",
    image:
      "https://scontent.fdac41-1.fna.fbcdn.net/v/t39.30808-6/305028913_3216491891938381_3700215096177543916_n.jpg?stp=cp6_dst-jpg&_nc_cat=102&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeFWYF_XLhE3KLalYqf9rBmubCaYjhY3FLdsJpiOFjcUt2mj-w5s1IP0LUmRBclTduGJ9VOjnJ2PYMec7fFBWNTh&_nc_ohc=UgUf-XvHFvYQ7kNvgFyj84V&_nc_ht=scontent.fdac41-1.fna&oh=00_AYDRU2KUYgQ0Jsbd4WCnxkrC_mQVUFMOJvDG2co5LVjHqQ&oe=66FD75F8",
  },
  {
    id: 4,
    name: "Nafees Ashraf",
    designation: "Backend Developer",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 5,
    name: "Raiyan Siddique",
    designation: "Frontend Developer",
    image:
      "https://scontent.fdac41-2.fna.fbcdn.net/v/t39.30808-6/414675191_1764535087398590_7733606301081023934_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeF2QYmmw_0C7xzdFNPRd1LEVfFwFCa4C4BV8XAUJrgLgJE9YNhEtaoHkW3LRFQV4i0roKoSRWR_-r4j0TiLO4f4&_nc_ohc=wVl4VsBVxIcQ7kNvgFKwuys&_nc_ht=scontent.fdac41-2.fna&_nc_gid=APMp4eP1jorHtElcfhivHXF&oh=00_AYBmV7Jicu4ADg_5YxcrmtlkYLDDa1XqcHyHKbKm9aloIg&oe=66FD4D71",
  },
  
];

export default function AnimatedTooltipPreview() {
  return (
    <div className="flex flex-row items-center justify-center mb-10 w-full">
      <AnimatedTooltip items={people} />
    </div>
  );
}
