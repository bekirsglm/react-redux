import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import Modal from "../components/Modal";
import { useEffect, useState } from "react";
import { modalFunc } from "../redux/modalSlice";
import { createDataFunc, updateDataFunc } from "../redux/dataSlice";
import Input from "../components/Input";
import Button from "../components/Button";
import { useLocation, useNavigate } from "react-router-dom";

const Product = () => {
  const { modal } = useSelector(state => state.modal);
  const { data, keyword } = useSelector(state => state.data);
  const dispatch = useDispatch();

  const [productInfo, setProductInfo] = useState({
    name: "",
    price: "",
    url: ""
  });

  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const loc = params.get("update");

  const onChangeFunc = (e, type) => {
    if (type === "url") {
      setProductInfo(prev => ({
        ...prev,
        url: URL.createObjectURL(e.target.files[0])
      }));
    } else {
      setProductInfo(prev => ({
        ...prev,
        [e.target.name]: e.target.value
      }));
    }
  };

  useEffect(() => {
    if (loc) {
      const found = data.find(dt => dt.id == loc);
      if (found) {
        setProductInfo({
          name: found.name || "",
          price: found.price || "",
          url: found.url || ""
        });
      }
    } else {
      setProductInfo({ name: "", price: "", url: "" });
    }
  }, [loc, data]);

  const buttonFunc = () => {
    const newId = data.length ? Math.max(...data.map(d => d.id)) + 1 : 1;
    dispatch(createDataFunc({ ...productInfo, id: newId }));
    dispatch(modalFunc());
  };

  const buttonUpdateFunc = () => {
    dispatch(updateDataFunc({ ...productInfo, id: Number(loc) }));
    dispatch(modalFunc());
    navigate(`/`);
  };

  const contentModal = (
    <>
      <Input
        value={productInfo.name}
        type="text"
        placeholder="Ürün Ekle"
        name="name"
        id="name"
        onChange={e => onChangeFunc(e, "name")}
      />

      <Input
        value={productInfo.price}
        type="number"
        placeholder="Fiyat Ekle (€)"
        name="price"
        id="price"
        onChange={e => onChangeFunc(e, "price")}
      />

      <Input
        type="file"
        placeholder="Resim Seç"
        name="url"
        id="url"
        onChange={e => onChangeFunc(e, "url")}
      />

      <Button
        btnText={loc ? "Ürün Güncelle" : "Ürün Oluştur"}
        onClick={loc ? buttonUpdateFunc : buttonFunc}
      />
    </>
  );

  const filteredItems = data.filter(dt =>
    dt.name.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <div className="p-4">
      <div className="flex items-center flex-wrap">
        {filteredItems.map((dt, i) => (
          <ProductCard key={i} dt={dt} />
        ))}
      </div>

      {modal && (
        <Modal
          content={contentModal}
          title={loc ? "Ürün Güncelle" : "Ürün Oluştur"}
        />
      )}
    </div>
  );
};

export default Product;

