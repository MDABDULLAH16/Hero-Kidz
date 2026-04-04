import { getProductById } from "@/actions/server/products";
import CartButton from "@/components/buttons/CartButton";
import Image from "next/image";
import { FaStar, FaShoppingCart, FaBolt } from "react-icons/fa";

export async function generateMetadata({ params }) {
  const { id } = await params;

  const product = (await getProductById(id)) || {};

  const { title, description, image, price, discount } = product;

  const discountedPrice =
    price && discount ? Math.round(price - (price * discount) / 100) : price;

  return {
    title: title || "Product Details",
    description:
      description?.slice(0, 150) ||
      "Explore amazing toys for kids at HeroKidz.",

    openGraph: {
      title: title,
      description: description?.slice(0, 150),
      images: [
        {
          url: image || "https://i.ibb.co.com/XZxk7JH8/logo.webp",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: title,
      description: description?.slice(0, 150),
      images: [image || "https://i.ibb.co.com/XZxk7JH8/logo.webp"],
    },

    alternates: {
      canonical: `https://herokidz-sage.vercel.app/products/${id}`,
    },

    keywords: [
      title,
      "kids toys",
      "HeroKidz",
      "buy toys online",
      "educational toys",
    ],

    other: {
      "product:price:amount": discountedPrice,
      "product:price:currency": "BDT",
    },
  };
}

const ProductDetails = async ({ params }) => {
  const { id } =await  params;
  const product = (await getProductById(id)) || {};

  const {
    title,
    bangla,
    image,
    price,
    discount,
    description,
    ratings,
    reviews,
    sold,
    info,
    qna,
  } = product;
  // console.log("producdetails", product);

  const discountedPrice = Math.round(price - (price * discount) / 100);

  return (
    <div className="max-w-6xl mx-auto p-4 grid md:grid-cols-2 gap-10">
      {/* Image */}
      <div className="bg-base-100 shadow rounded-xl p-4">
        <Image
          src={image || "https://i.ibb.co.com/XZxk7JH8/logo.webp"}
          width={500}
          height={500}
          alt={title || "product"}
          className="w-full object-cover rounded-lg"
        />
      </div>

      {/* Product Info */}
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-gray-500">{bangla}</p>

        {/* Rating */}
        <div className="flex items-center gap-3 text-sm">
          <div className="flex items-center gap-1 text-yellow-500">
            <FaStar />
            {ratings}
          </div>
          <span>{reviews} reviews</span>
          <span>{sold} sold</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-3">
          <span className="text-3xl font-bold text-primary">
            ৳{discountedPrice}
          </span>

          {discount > 0 && (
            <span className="line-through text-gray-400">৳{price}</span>
          )}

          <span className="badge badge-error text-white ">-{discount}%</span>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <CartButton product={product} />

          <button className="btn btn-secondary flex-1">
            <FaBolt />
            Buy Now
          </button>
        </div>

        {/* Info */}
        <div className="bg-base-100 p-4 rounded-lg shadow">
          <h3 className="font-semibold mb-2">Product Highlights</h3>

          <ul className="list-disc ml-5 space-y-1 text-sm">
            {info?.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Description */}
      <div className="md:col-span-2 bg-base-100 p-5 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-3">Description</h2>

        <p className="text-gray-600 whitespace-pre-line">{description}</p>
      </div>

      {/* QNA */}
      <div className="md:col-span-2 bg-base-100 p-5 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Questions & Answers</h2>

        <div className="space-y-4">
          {qna?.map((item, i) => (
            <div key={i} className="border-b pb-3">
              <p className="font-medium">❓ {item.question}</p>

              <p className="text-gray-600 mt-1">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
