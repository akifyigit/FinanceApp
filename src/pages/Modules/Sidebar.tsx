import React from "react";

const Sidebar = () => {
  const subItems = [
    {
      title: "Dashboard",
      subItems: [],
      route: "/dashboard",
    },
    {
      title: "Borçlar",
      subItems: [],
      route: "/debts",
    },
  ];
  return (
    <div className="sticky z-50 top-0 hidden md:block bottom-0 lg:left-0 p-2 w-60 text-center h-80vh  bg-gray-600 ">
      <div className="relative mt-6"></div>
      {subItems.map((item) => (
        <div key={item.route} className="mt-4">
          <a
            href={item.route}
            className="block py-2 px-4 text-sm font-medium border text-white bg-black hover:bg-gray-400 hover:text-black  rounded-lg"
          >
            {item.title}
          </a>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
