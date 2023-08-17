import React, { useEffect, useRef } from "react";
import { isBrowser } from "react-device-detect";
import { Navigate, useRoutes } from "react-router-dom";
import MainHomeMobile from "../Component/MainPage/MainHomeMobile";
import LineLoad from "../Component/MainPage/LineLoad";

const Menu_pay = React.lazy(() => import("../Component/Menu/Menu_pay"));
const MainHome = React.lazy(() => import("../Component/MainPage/MainHome"));
const Menu_index = React.lazy(() => import("../Component/Menu/Menu_index"));
const Setpin = React.lazy(() => import("../Component/MainPage/Setpin"));
const PinLogin = React.lazy(() => import("../Component/MainPage/PinLogin"));
const MainMobileAuth = React.lazy(
  () => import("../Component/MainPage/MainMobileAuth")
);
const MainLine = React.lazy(() => import("../Component/MainPage/MainLine"));
const MainAuth = React.lazy(() => import("../Component/MainPage/MainAuth"));
const LineLogin = React.lazy(() => import("../Component/MainPage/LineLogin"));
const TrackOrder = React.lazy(() => import("../Component/Ecom/TrackOrder"));
const ToDeliver = React.lazy(() => import("../Component/Ecom/ToDeliver"));
const Success = React.lazy(() => import("../Component/Ecom/Success"));
const Search = React.lazy(() => import("../Component/Ecom/Search"));
const Refund_Return = React.lazy(
  () => import("../Component/Ecom/Refund_Return")
);
const OrderDetails = React.lazy(() => import("../Component/Ecom/OrderDetails"));
const MyAddress = React.lazy(() => import("../Component/Ecom/MyAddress"));
const MustGet = React.lazy(() => import("../Component/Ecom/MustGet"));
const DeliveryAddress = React.lazy(
  () => import("../Component/Ecom/DeliveryAddress")
);
const Canceled = React.lazy(() => import("../Component/Ecom/Canceled"));
const Account = React.lazy(() => import("../Component/Ecom/Account"));
const History = React.lazy(() => import("../Component/Ecom/History"));
const Cart = React.lazy(() => import("../Component/Ecom/Cart"));
const Main = React.lazy(() => import("../Component/MainPage/Main"));
const Menu_Mobile = React.lazy(() => import("../Component/Menu/Menu_Mobile"));
const Menu_PC = React.lazy(() => import("../Component/Menu/Menu_PC"));
const Login = React.lazy(() => import("../Component/MainPage/Login"));
const Page404 = React.lazy(() => import("../Component/MainPage/Page404"));
const MainMobile = React.lazy(() => import("../Component/MainPage/MainMobile"));
const Price = React.lazy(() => import("../Component/Ecom/Price"));
const SignUp = React.lazy(() => import("../Component/MainPage/SignUp"));
const MyProfile = React.lazy(() => import("../Component/Ecom/MyProfile"));
const Home = React.lazy(() => import("../Component/Ecom/Home"));
const Pay = React.lazy(() => import("../Component/Ecom/Pay"));
const TopupQrcode = React.lazy(() => import("../Component/Ecom/TopupQrcode"));
const TopupCreditcard = React.lazy(
  () => import("../Component/Ecom/TopupCreditcard")
);
const ProductDetails = React.lazy(
  () => import("../Component/Ecom/ProductDetails")
);

const ConfirmEmail = React.lazy(() => import("../Component/Ecom/ConfirmEmail"));
const Forgotpass = React.lazy(() => import("../Component/Ecom/Forgotpass"));
const Resetpass = React.lazy(() => import("../Component/Ecom/Resetpass"));
const ForgotEmail = React.lazy(() => import("../Component/Ecom/ForgotEmail"));
const ForgotNewPass = React.lazy(
  () => import("../Component/Ecom/ForgotNewpass")
);
const ChangeEmailpath2 = React.lazy(
  () => import("../Component/Ecom/ChangeEmailpath2")
);
const ChangeEmailpath3 = React.lazy(
  () => import("../Component/Ecom/ChangeEmailpath3")
);
const ChangePassWord2 = React.lazy(
  () => import("../Component/Ecom/ChangePassword2")
);
const ChangePhoneNumber2 = React.lazy(
  () => import("../Component/Ecom/ChangePhoneNumber2")
);
const ChangePhoneNumber3 = React.lazy(
  () => import("../Component/Ecom/ChangePhoneNumber3")
);
const Pin = React.lazy(() => import("../Component/Ecom/Pin"));
const VerifyYourEmail = React.lazy(
  () => import("../Component/Ecom/VerifyYourEmail")
);
const OTP = React.lazy(() => import("../Component/Ecom/OTP"));
const Notification = React.lazy(() => import("../Component/Ecom/Notification"));

export default function Router() {
  const menupayRef = useRef(null);
  return useRoutes([
    {
      path: "/",
      element: <MainHome />,
      children: [
        {
          index: true,
          path: "/",
          element: isBrowser ? (
            <Menu_PC pageshow={<Home />} />
          ) : (
            <Menu_Mobile pageshow={<Home />} />
          ),
        },

        {
          path: "ProductDetails",
          element: isBrowser ? (
            <Menu_PC pageshow={<ProductDetails />} />
          ) : (
            <Menu_Mobile pageshow={<ProductDetails />} />
          ),
        },

        {
          path: "Search",
          element: isBrowser ? (
            <Menu_PC pageshow={<Search />} />
          ) : (
            <Menu_Mobile pageshow={<Search />} />
          ),
        },

        {
          path: "Price",
          element: isBrowser ? (
            <Menu_PC pageshow={<Price />} />
          ) : (
            <Menu_Mobile pageshow={<Price />} />
          ),
        },

        { path: "404", element: <Page404 /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },

    {
      path: "/Authen",
      element: <MainAuth />,
      children: [
        { index: true, path: "/Authen", element: <Login navTo={"/"} /> },
        { path: "SignUp", element: <SignUp /> },
        { path: "Forgotpass", element: <Forgotpass /> },
        { path: "Resetpass", element: <Resetpass /> },
        { path: "ForgotEmail", element: <ForgotEmail /> },
        { path: "ForgotNewPass", element: <ForgotNewPass /> },
        { path: "LineLogin", element: <PinLogin /> },

        {
          path: "LineLoad",
          element: <LineLoad />,
        },
      ],
    },

    {
      path: "/LineAuthen",
      element: <MainLine />,
      children: [{ index: true, path: "/LineAuthen", element: <LineLogin /> }],
    },

    {
      path: "/Main",
      element: <Main />,
      children: [
        {
          index: true,
          path: "/Main",
          element: isBrowser ? (
            <Menu_PC pageshow={<Home />} />
          ) : (
            <Menu_Mobile pageshow={<Home />} />
          ),
        },

        {
          path: "Cart",
          element: isBrowser ? (
            <Menu_PC pageshow={<Cart />} />
          ) : (
            <Menu_Mobile pageshow={<Cart />} />
          ),
        },

        {
          path: "MyProfile",
          element: isBrowser ? (
            <Menu_PC pageshow={<MyProfile />} />
          ) : (
            <Menu_Mobile pageshow={<MyProfile />} />
          ),
        },

        {
          path: "Pay",
          element: isBrowser ? (
            <Menu_PC pageshow={<Pay />} />
          ) : (
            <Menu_Mobile pageshow={<Pay />} />
          ),
        },

        {
          path: "History",
          element: isBrowser ? (
            <Menu_PC pageshow={<History />} />
          ) : (
            <Menu_Mobile pageshow={<History />} />
          ),
        },

        {
          path: "ProductDetails",

          element: isBrowser ? (
            <Menu_PC pageshow={<ProductDetails />} />
          ) : (
            <Menu_Mobile pageshow={<ProductDetails />} />
          ),
        },

        {
          path: "Setpin",
          element: isBrowser ? (
            <Menu_PC pageshow={<Setpin />} />
          ) : (
            <Menu_Mobile pageshow={<Setpin />} />
          ),
        },

        {
          path: "Pin",
          element: isBrowser ? (
            <Menu_PC pageshow={<Pin />} />
          ) : (
            <Menu_Mobile pageshow={<Pin />} />
          ),
        },

        {
          path: "ConfirmEmail",
          element: isBrowser ? (
            <Menu_PC pageshow={<ConfirmEmail />} />
          ) : (
            <Menu_Mobile pageshow={<ConfirmEmail />} />
          ),
        },

        {
          path: "TopupQrcode",
          element: isBrowser ? (
            <Menu_PC pageshow={<TopupQrcode />} />
          ) : (
            <Menu_Mobile pageshow={<TopupQrcode />} />
          ),
        },

        {
          path: "TopupCreditcard",
          element: isBrowser ? (
            <Menu_PC pageshow={<TopupCreditcard />} />
          ) : (
            <Menu_Mobile pageshow={<TopupCreditcard />} />
          ),
        },

        {
          path: "DeliveryAddress",
          element: isBrowser ? (
            <Menu_PC pageshow={<DeliveryAddress />} />
          ) : (
            <Menu_Mobile pageshow={<DeliveryAddress />} />
          ),
        },

        {
          path: "TrackOrder",
          element: isBrowser ? (
            <Menu_PC pageshow={<TrackOrder />} />
          ) : (
            <Menu_Mobile pageshow={<TrackOrder />} />
          ),
        },

        {
          path: "ToDeliver",
          element: isBrowser ? (
            <Menu_PC pageshow={<ToDeliver />} />
          ) : (
            <Menu_Mobile pageshow={<ToDeliver />} />
          ),
        },

        {
          path: "MustGet",
          element: isBrowser ? (
            <Menu_PC pageshow={<MustGet />} />
          ) : (
            <Menu_Mobile pageshow={<MustGet />} />
          ),
        },

        {
          path: "Success",
          element: isBrowser ? (
            <Menu_PC pageshow={<Success />} />
          ) : (
            <Menu_Mobile pageshow={<Success />} />
          ),
        },

        {
          path: "Canceled",
          element: isBrowser ? (
            <Menu_PC pageshow={<Canceled />} />
          ) : (
            <Menu_Mobile pageshow={<Canceled />} />
          ),
        },

        {
          path: "OrderDetails",
          element: isBrowser ? (
            <Menu_PC pageshow={<OrderDetails />} />
          ) : (
            <Menu_Mobile pageshow={<OrderDetails />} />
          ),
        },

        {
          path: "Refund_Return",
          element: isBrowser ? (
            <Menu_PC pageshow={<Refund_Return />} />
          ) : (
            <Menu_Mobile pageshow={<Refund_Return />} />
          ),
        },

        {
          path: "MyAddress",
          element: isBrowser ? (
            <Menu_PC pageshow={<MyAddress />} />
          ) : (
            <Menu_Mobile pageshow={<MyAddress />} />
          ),
        },

        {
          path: "Account",
          element: isBrowser ? (
            <Menu_PC pageshow={<Account />} />
          ) : (
            <Menu_Mobile pageshow={<Account />} />
          ),
        },

        {
          path: "ChangeEmailpath",
          element: isBrowser ? (
            <Menu_PC pageshow={<ChangeEmailpath2 />} />
          ) : (
            <Menu_Mobile pageshow={<ChangeEmailpath2 />} />
          ),
        },

        {
          path: "ChangeEmailpath2",
          element: isBrowser ? (
            <Menu_PC pageshow={<ChangeEmailpath3 />} />
          ) : (
            <Menu_Mobile pageshow={<ChangeEmailpath3 />} />
          ),
        },

        {
          path: "VerifyYourEmail",
          element: isBrowser ? (
            <Menu_PC pageshow={<VerifyYourEmail />} />
          ) : (
            <Menu_Mobile pageshow={<VerifyYourEmail />} />
          ),
        },

        {
          path: "ChangePhoneNumber",
          element: isBrowser ? (
            <Menu_PC pageshow={<ChangePhoneNumber2 />} />
          ) : (
            <Menu_Mobile pageshow={<ChangePhoneNumber2 />} />
          ),
        },

        {
          path: "ChangePhoneNumber2",
          element: isBrowser ? (
            <Menu_PC pageshow={<ChangePhoneNumber3 />} />
          ) : (
            <Menu_Mobile pageshow={<ChangePhoneNumber3 />} />
          ),
        },

        {
          path: "ChangePassWord",
          element: isBrowser ? (
            <Menu_PC pageshow={<ChangePassWord2 />} />
          ) : (
            <Menu_Mobile pageshow={<ChangePassWord2 />} />
          ),
        },

        {
          path: "OTP",
          element: isBrowser ? (
            <Menu_PC pageshow={<OTP />} />
          ) : (
            <Menu_Mobile pageshow={<OTP />} />
          ),
        },

        {
          path: "Notification",
          element: isBrowser ? (
            <Menu_PC pageshow={<Notification />} />
          ) : (
            <Menu_Mobile pageshow={<Notification />} />
          ),
        },

        { path: "404", element: <Page404 /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },

    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}

//index: true,
