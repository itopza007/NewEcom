import React, { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { StepperNav } from "vertical-stepper-nav";
export default function OrderDetails(prop) {
  //------------------------------------------- ตัวแปร ------------------------------------------
  let location: any = useLocation();

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const name = searchParams.get("name");
  const img = searchParams.get("img");
  const price = searchParams.get("price");
  const [currentStep, setCurrentStep] = useState(3);
  const steps = {
    data: [
      {
        id: 1,
        text: "Order Piaced",
        text2: "You're viewing icons, an older version of Font Awesome.",
        date: "12/09/2650",
        stat: "pass",
      },
      {
        id: 2,
        text: "Confirmed",
        text2: "You're viewing an older version of Font Awesome.",
        date: "12/09/2650",
        stat: "pass",
      },
      {
        id: 3,
        text: "Order Shipped",
        text2: "You're viewing icons for v5.15.4, an older version of Font ",
        date: "12/09/2650",
        stat: "wait",
      },
      {
        id: 4,
        text: "Out For Delivery",
        text2: "You're viewing icons for v5.15.4,  of Font Awesome.",
        date: "",
      },
      {
        id: 5,
        text: "Deliverd",
        text2: "You're viewing icons for v5.15.4, an older version ",
        date: "",
      },
    ],
  };
  //------------------------------------------- onload ------------------------------------------
  useEffect(() => {}, []);

  //------------------------------------------- html ------------------------------------------
  return (
    <div className="grid grid-cols-12 p-5">
      <div className="grid col-span-12">
        <div className="grid grid-cols-12 border rounded-md p-3">
          <div className="grid col-span-4 content-center after:pt-[75%] after:block after:content-[''] relative">
            <div className="absolute top-0 right-0 left-0 bottom-0 flex w-full h-full">
              <img
                className="rounded-lg object-cover w-[inherit] h-[inherit] max-w-[inherit] max-h-[inherit]"
                src={img}
                loading="lazy"
              />
            </div>
          </div>
          <div className="grid col-span-8 pl-3">
            <div className="flex">
              <div className="text-gray-800 font-semibold">Order :</div>
              <div className="text-gray-500 pl-1">#000000B2</div>
            </div>
            <div className="flex">
              <div className="text-gray-800 font-semibold">Name :</div>
              <div className="text-gray-500 pl-1">{name}</div>
            </div>
            <div className="flex">
              <div className="text-gray-800 font-semibold">Option :</div>
              <div className="text-gray-500 pl-1">M</div>
              <div className="text-gray-500 font-semibold mx-1">|</div>
              <div className="text-gray-800 font-semibold">Unit :</div>
              <div className="text-gray-500 pl-1">ชิ้น</div>
            </div>
            <div className="flex">
              <div className="text-gray-800 font-semibold">Price :</div>
              <div className="text-gray-500 pl-1">{price}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid col-span-12">
        <div className="">
          {steps.data?.map((step, i) => (
            <div key={step.id}>
              <div
                key={i}
                className={`step-itemMB items-start ${
                  currentStep === i + 1 && "active"
                } ${i + 1 < currentStep && "complete"} `}
              >
                <div className="grid grid-cols-12">
                  <div className="grid col-span-2 content-center">
                    {currentStep < step.id ? (
                      <div className="step cursor-pointer">{step.id}</div>
                    ) : (
                      <div className="step cursor-pointer" onClick={() => {}}>
                        {step.id}
                      </div>
                    )}
                  </div>
                  <div className="grid col-span-6 ontent-center">
                    <p className="text-gray-500">{step.text}</p>
                    <p className="text-gray-500 text-xs">{step.text2}</p>
                  </div>
                  <div className="grid col-span-4 ontent-center mt-1">
                    <p className="text-gray-500 text-xs text-end">
                      {step.date}
                    </p>
                    <p className="text-gray-500 text-xs text-end">
                      {step.stat}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
