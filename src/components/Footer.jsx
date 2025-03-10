const Footer = () => {
    return (
        <footer className="shadow-sm  bg-light py-1 mt-auto text-center fixed-bottom"
            style={{ backgroundColor: "white" }}>
            <p> © {new Date().getFullYear()} HaveYouReadIt <br />All rights reserved.</p>
        </footer >
    );
};

export default Footer;