import { FocusCards } from "D:/ECOSYNC/Frontend/src/components/ui/focus-cards.jsx"; // Adjust the path to match your folder structure

export default function FocusCardsDemo() {
  const cards = [
    {
      title: "Climate Cascade",
      src: "https://img.freepik.com/premium-vector/cartoon-child-large-planet-with-person-it_730620-634953.jpg?w=740",
    },
    {
      title: "Wildfire Warrior",
      src: "https://cdn1.vectorstock.com/i/1000x1000/42/40/soldier-running-away-from-wildfire-vector-10114240.jpg",
    },
    {
      title: "Sala behta hi jayega",
      src: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?q=80&w=3070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Camping is for pros",
      src: "https://images.unsplash.com/photo-1486915309851-b0cc1f8a0084?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Water Cycle Quest",
      src: "https://img.freepik.com/free-vector/water-cycle-earth-concept_1308-131402.jpg?t=st=1727711153~exp=1727714753~hmac=f4d6f87a2854d46862a005f21b9cb56f41ca3da20fa395781d771a870d20fb9c&w=1060",
    },
    {
      title: "The First Rule",
      src: "https://assets.aceternity.com/the-first-rule.png",
    },
  ];

  return <FocusCards cards={cards} />;
}
