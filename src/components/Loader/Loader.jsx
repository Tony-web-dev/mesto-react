import loadpic from "../../images/loader-ball.gif";

export default function Loader() {
    return (
        <div className="loader">
            <img 
                src={loadpic}
                alt="загрузчик"
                width={150}
            />
        </div>
    )
}