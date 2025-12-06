import { MdPostAdd } from "react-icons/md";
import { useDispatch } from "react-redux";
import { modalFunc } from "../redux/modalSlice";
import { searchDataFunc, sortingDataFunc } from "../redux/dataSlice";

const Header = () => {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center justify-between bg-indigo-600 text-white px-4 py-3">
      <div className="text-3xl">REACT UYGULAMA</div>

      <div className="flex items-center gap-5">
        
        {/* Sıralama dropdown */}
        <div className="text-black">
          <select
            onChange={e => dispatch(sortingDataFunc(e.target.value))}
            className="bg-white text-black h-10 rounded-lg"
          >
            <option value="asc">ARTAN</option>
            <option value="desc">AZALAN</option>
          </select>
        </div>

        {/* Arama inputu */}
        <input
          onChange={e => dispatch(searchDataFunc(e.target.value))}
          className="bg-white text-black h-10 rounded-lg px-4"
          type="text"
          placeholder="Arama yapınız..."
        />

        {/* Modal açma butonu */}
        <div
          className="bg-indigo-800 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer"
          onClick={() => dispatch(modalFunc())}
        >
          <MdPostAdd size={25} />
        </div>
      </div>
    </div>
  );
};

export default Header;
