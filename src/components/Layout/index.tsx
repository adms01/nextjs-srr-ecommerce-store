import { useContext } from "react";
import Link from "next/link";
import BasketContext from "../../contexts/basketContext";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const basketCtx = useContext(BasketContext);

  return (
    <div className="container mx-auto my-4 px-4">
      <div className="flex justify-between">
        <Link href="/">
          <strong className="cursor-pointer">Store</strong>
        </Link>

        <nav>
          <ul className="flex gap-4">
            <li>
              <Link href="/">
                <a className="">Products</a>
              </Link>
            </li>
            <li>
              <Link href="/cart">
                <a className="">Your Cart</a>
              </Link>
            </li>

            {basketCtx.quantity > 0 && (
              <div className="bg-gray-400 pl-2 pr-2 rounded-md">
                <span className="text-xs">{basketCtx.quantity}</span>
              </div>
            )}
          </ul>
        </nav>
      </div>
      {children}
    </div>
  );
};

export default Layout;

// {basketCtx.quantity}
