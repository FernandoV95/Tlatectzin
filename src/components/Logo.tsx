//https://www.facebook.com/ElCalvodeMC/videos/561040555274709/?rdid=TrNJrMI8jRNkd8Bi#

function Logo() {

    return (
        <div className="logo flex items-center justify-center mt-4">
            <div className="logo-icon">
                <img
                    title="Tlatectzin"
                    src="/ajolote.png"
                    onClick={() => window.open('https://www.facebook.com/ElCalvodeMC/videos/561040555274709/?rdid=TrNJrMI8jRNkd8Bi#', '_blank')}
                    className="cursor-pointer hover:scale-150 transition-all duration-500"
                    alt="Logo de Tlatectzin" />
            </div>
        </div>
    )
}

export default Logo