import { AnimatedTooltip } from "../ui/animated-tooltip"; // Adjust path as necessary

const people = [
  {
    id: 1,
    name: "Aurchi Chowdhury",
    designation: "UI/UX Designer",
    image:
      "images/Aurchi.jpg",
  },
  {
    id: 2,
    name: "Abrar Zahin Raihan",
    designation: "Researcher",
    image:
      "images/Raihan.jpeg",
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
    name: "Sk. Ashrafuzzaman Nafees",
    designation: "Backend Developer",
    image:
      "images/Nafees.jpeg",
  },
  {
    id: 5,
    name: "Raiyan Siddiqui",
    designation: "Frontend Developer",
    image:
      "images/raiyan.JPG",
  },
  
];

export default function AnimatedTooltipPreview() {
  return (
    <div className="flex flex-row items-center justify-center mb-10 w-full">
      <AnimatedTooltip items={people} />
    </div>
  );
}
