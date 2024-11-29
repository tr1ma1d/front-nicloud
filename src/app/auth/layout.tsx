import { Provider } from "react-redux";
import store from "@/store/store";


export default function RootLayout({
    children,
}:Readonly<{
    children: React.ReactNode;
}>){
    return(
        <div>
            {children}
        </div>
    )
}