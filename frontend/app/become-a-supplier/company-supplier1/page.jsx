import Footer from "../../../components/Footer";
import Header from "../../../components/Navbar";
import CompanySuppplierForm from "./components/CompanySupplierForm";


export default function CompanySuppplierPage () {
    return (
        <div>
            <Header />
            <div className="py-5">
            <CompanySuppplierForm />
            </div>
            <Footer />
        </div>
    )
}