import {Container} from "@/components/layout/container/container";
import {models} from "@/data/models";
import {CardModels} from "@/components/layout/card-models";

export default function Home() {

    function renderModels() {
        return models.map(model => {
            return (
                <CardModels model={model}/>
            )
        })
    }

    return (
        <main className={`w-full`}>
            <Container>
                <h1 className={`text-2xl font-semibold  `}>ESMALTAÇÃO EM GEL</h1>
                <div className={`grid grid-cols-2 `}>
                    <div className={`min-w-[30rem] max-w-[30rem] min-h-[30rem] max-h-[30rem]`}>
                        <img
                            className="w-full h-full object-cover rounded-md"
                            src="/nail_model_1.jpg"
                            alt="Modelo 1"/>
                    </div>
                    <div className={`grid grid-cols-1 max-h-[30rem] gap-5 overflow-y-scroll`}>
                        {renderModels()}
                    </div>
                </div>

                <div className={`flex gap-5 items-center justify-center overflow-x-scroll mt-10`}>
                    <div className="card glass w-96">
                        <figure>
                            <img
                                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                                alt="car!"/>
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">Life hack</h2>
                            <p>How to park your car at your garage?</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">Learn now!</button>
                            </div>
                        </div>
                    </div>

                    <div className="card glass w-96">
                        <figure>
                            <img
                                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                                alt="car!"/>
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">Life hack</h2>
                            <p>How to park your car at your garage?</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">Learn now!</button>
                            </div>
                        </div>
                    </div>

                    <div className="card glass w-96">
                        <figure>
                            <img
                                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                                alt="car!"/>
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">Life hack</h2>
                            <p>How to park your car at your garage?</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary">Learn now!</button>
                            </div>
                        </div>
                    </div>

                </div>
            </Container>
        </main>
    );
}

