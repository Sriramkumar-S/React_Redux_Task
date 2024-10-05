import { Outlet } from "react-router-dom";
const Header = () => {
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        {/* <h1>Inside Header</h1> */}
                        <header style={{ border: '1px solid', padding: 8, position: 'relative' }}>
                            <h2>Products</h2>
                        </header>
                    </div>
                </div>
            </div>

            <Outlet />
        </>
    )
}

export default Header;