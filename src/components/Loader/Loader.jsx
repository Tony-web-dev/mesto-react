import loadpic from "../../images/loader-dance.gif"

export default function Loader() {
    return (
        <div className="loader">
            <img 
                src={loadpic}
                alt="загрузчик"
                width={200}
            />
        </div>
    )
}