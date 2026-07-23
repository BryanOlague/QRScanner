import {
  FaHome,
  FaShoppingCart,
  FaShoppingBag,
  FaHeart,
  FaUser,
} from "react-icons/fa";

export default function Sidebar() {
  const menu = [
    {
      name: "Dashboard",
      icon: <FaHome />,
    },

    {
      name: "Cart",
      icon: <FaShoppingCart />,
    },

    {
      name: "Shopping",
      icon: <FaShoppingBag />,
    },

    {
      name: "My Favourite",
      icon: <FaHeart />,
    },

    {
      name: "Profile",
      icon: <FaUser />,
    },
  ];

  return (
    <aside
      className={`
        fixed
        md:static
        top-0
        left-0
        z-40
        h-screen
        w-72
        bg-white
        border-r-2
        border-gray-200
        p-3
        transition-transform
        duration-300

       

      `}
    >
      <nav
        className="
          flex
          flex-col
          gap-2
        "
      >
        {menu.map((item, index) => (
          <a
            key={index}
            href="#"
            className="
                flex
                items-center
                gap-3
                rounded-md
                px-3
                py-3
                text-gray-700
                hover:bg-gray-100
                hover:text-blue-600
                transition-all
              "
          >
            <span
              className="
                  text-xl
                "
            >
              {item.icon}
            </span>

            <span>{item.name}</span>
          </a>
        ))}
      </nav>
    </aside>
  );
}
