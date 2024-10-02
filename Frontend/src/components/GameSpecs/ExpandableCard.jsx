import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "D:/ECOSYNC/Frontend/src/components/ui/use-outside-click";

export default function ExpandableCard() {
  const [active, setActive] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") {
        setActive(null);
      }
    }

    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active ? (
          <div className="fixed inset-0 grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.title}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}`}
              ref={ref}
              className="w-full max-w-[600px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <motion.div layoutId={`image-${active.title}`}>
                <img
                  width={250}
                  height={250}
                  src={active.src}
                  alt={active.title}
                  className="w-full h-96 lg:h-96 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                />
              </motion.div>

              <div>
                <div className="flex justify-between items-start p-4">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${active.title}`}
                      className="font-bold text-neutral-700 dark:text-neutral-200 text-3xl"
                    >
                      {active.title}
                    </motion.h3>
                  </div>

                  <motion.a
                    layoutId={`button-${active.title}`}
                    href={active.ctaLink}
                    target="_blank"
                    className="px-6 py-4 text-lg rounded-full font-bold bg-green-500 text-white"
                  >
                    {active.ctaText}
                  </motion.a>
                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                  >
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      {/* Updated grid layout for 2 columns and 3 cards per column */}
      <ul className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {cards.map((card) => (
          <motion.div
            layoutId={`card-${card.title}`}
            key={`card-${card.title}`}
            onClick={() => setActive(card)}
            className="p-6 flex flex-col md:flex-row justify-between items-center bg-white transition-colors duration-300 rounded-xl cursor-pointer"
          >
            <div className="flex gap-6 flex-col md:flex-row items-center justify-center">
              {/* Card Image */}
              <motion.div layoutId={`image-${card.title}`}>
                <img
                  width={150}
                  height={150}
                  src={card.src}
                  alt={card.title}
                  className="h-56 w-56 md:h-32 md:w-32 rounded-lg object-cover object-top"
                />
              </motion.div>

              {/* Card Title */}
              <div className="">
                <motion.h3
                  layoutId={`title-${card.title}`}
                  className="font-bold text-neutral-800 dark:text-neutral-200 text-center md:text-left text-3xl"
                >
                  {card.title}
                </motion.h3>
              </div>
            </div>

            {/* Card Button */}
            <motion.button
              layoutId={`button-${card.title}`}
              className="px-6 py-3 text-md rounded-full font-bold bg-gray-100 hover:bg-green-500 hover:text-white text-black mt-4 md:mt-0"
            >
              {card.ctaText}
            </motion.button>
          </motion.div>
        ))}
      </ul>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

// Expanded to 6 cards
const cards = [
  {
    title: "Summertime Sadness",
    src: "https://assets.aceternity.com/demos/lana-del-rey.jpeg",
    ctaText: "Play",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => {
      return <p>Some content here</p>;
    },
  },
  {
    title: "Mitran Di Chhatri",
    src: "https://assets.aceternity.com/demos/babbu-maan.jpeg",
    ctaText: "Play",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => {
      return <p>Some content here</p>;
    },
  },
  {
    title: "Wildfire Warrior",
    src: "https://img.freepik.com/premium-vector/wildfire-forest-fire-background_281368-429.jpg?w=360",
    ctaText: "Play",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => {
      return <p>Wildfire Warrior is an action-packed adventure game where players take on the role of a brave firefighter, battling intense wildfires to save forests, wildlife, and nearby communities. Set in a world threatened by a series of uncontrollable wildfires, players must strategically plan their firefighting tactics, control water resources, and deploy cutting-edge technology to contain the flames.</p>;
    },
  },
  {
    title: "Ocean Breeze",
    src: "https://assets.aceternity.com/demos/ocean-breeze.jpeg",
    ctaText: "Play",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => {
      return <p>Some content here</p>;
    },
  },
  {
    title: "Mountain Echoes",
    src: "https://assets.aceternity.com/demos/mountain-echoes.jpeg",
    ctaText: "Play",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => {
      return <p>Some content here</p>;
    },
  },
  {
    title: "Rainy Daze",
    src: "https://assets.aceternity.com/demos/rainy-daze.jpeg",
    ctaText: "Play",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => {
      return <p>Some content here</p>;
    },
  },
];
