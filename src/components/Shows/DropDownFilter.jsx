import { useState } from "react";
import { ChevronDown } from "lucide-react";

export const DropdownFilterPrice = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      onMouseLeave={() => isOpen && setIsOpen(!isOpen)}
      className="relative">
      {/* Button */}
      <button 
        className="flex items-center gap-2 px-4 py-2 rounded-lg shadow-sm bg-base-200 hover:bg-base-100 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        Price Range <ChevronDown size={16} />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute w-full bg-base-100 shadow-lg"
            onMouseLeave={() => setIsOpen(!isOpen)}
        >
            <ul>
            <li>
                <label className="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-base-200">
                <input type="checkbox" className="checkbox checkbox-sm" />
                ₹0 - ₹200
                </label>
            </li>
            <li>
                <label className="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-base-200">
                <input type="checkbox" className="checkbox checkbox-sm" />
                ₹201 - ₹300
                </label>
            </li>
            </ul>
        </div>
      
      )}
    </div>
  );
};

export const DropdownFilterLanguage = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      onMouseLeave={() => isOpen && setIsOpen(!isOpen)}
      className="relative">
      {/* Button */}
      <button 
        className="flex items-center gap-2 px-4 py-2  rounded-lg shadow-sm bg-base-200 hover:bg-base-100 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        Language <ChevronDown size={16} />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute w-full bg-base-100 shadow-lg"
        
            onMouseLeave={() => setIsOpen(!isOpen)}

        >
            
            <ul>
            <li>
                <label className="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-base-200">
                <input type="checkbox" className="checkbox checkbox-sm" />
                    Tamil
                </label>
            </li>
            <li>
                <label className="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-base-200">
                <input type="checkbox" className="checkbox checkbox-sm" />
                    Malayalam
                </label>
            </li>
            </ul>
        </div>
      
      )}
    </div>
  );
};

export const DropdownFilterTime = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
        onMouseLeave={() => isOpen && setIsOpen(!isOpen)}
        className="relative">
        
      {/* Button */}
      <button 
        className="flex items-center gap-2 px-4 py-2  rounded-lg shadow-sm bg-base-200 hover:bg-base-100 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        Prefered Time<ChevronDown size={16} />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute w-40 bg-base-100 shadow-lg">
            <ul>
                <li>
                    <label className="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-base-200">
                    <input type="checkbox" className="checkbox checkbox-sm" />
                        <div className="flex flex-col">    
                            <p>Morning</p>
                            <p className="text-[12px]">12:00 AM - 11:59 AM</p>
                        </div>
                    </label>
                </li>
                <li>
                    <label className="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-base-200">
                    <input type="checkbox" className="checkbox checkbox-sm" />
                        <div className="flex flex-col">    
                            <p>Afternoon</p>
                            <p className="text-[12px]">12:00 PM - 3:59 PM</p>
                        </div>
                    </label>
                </li>
                <li>
                    <label className="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-base-200">
                    <input type="checkbox" className="checkbox checkbox-sm" />
                        <div className="flex flex-col">    
                            <p>Evening</p>
                            <p className="text-[12px]">4:00 PM - 6:59 AM</p>
                        </div>
                    </label>
                </li>
                <li>
                    <label className="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-base-200">
                    <input type="checkbox" className="checkbox checkbox-sm" />
                        <div className="flex flex-col">    
                            <p>Night</p>
                            <p className="text-[12px]">7:00 PM - 11:59 PM</p>
                        </div>
                    </label>
                </li>
            </ul>
        </div>
      
      )}
    </div>
  );
};


