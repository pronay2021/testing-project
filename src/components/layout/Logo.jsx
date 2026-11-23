import logo from "../../assets/auth/logo.png";

export default function Logo({ className = "h-11" }) {
  return <img src={logo} alt="A2" className={`${className} w-auto`} />;
}
