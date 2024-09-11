import {Footer} from "@/components/footer/footer";
import {Container} from "@/components/layout/container/container";

export default function Home() {

    return (
        <main className={`w-full`}>
            <Container>
                <div className={`flex`}>
                    <div className={`min-w-[30rem] max-w-[30rem] min-h-[30rem] max-h-[30rem]`}>
                        <img
                            className="w-full h-full object-cover"
                            src="/nail_model_1.jpg"
                            alt="Modelo 1"/>
                    </div>

                    <div className={`flex flex-col p-10 flex-wrap gap-5`}>
                        <h1 className={`text-3xl font-bold`}>Esmaltação em gel</h1>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                            been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
                            galley of type and scrambled it to make a type specimen book. It has survived not only five
                            centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                            It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
                            passages, and more recently with desktop publishing software like Aldus PageMaker including
                            versions of Lorem Ipsum.</p>
                    </div>
                </div>

                <div className={`flex`}>
                    <div className={`flex flex-col p-10 flex-wrap gap-5`}>
                        <h1 className={`text-3xl font-bold`}>Esmaltação simples</h1>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                            been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
                            galley of type and scrambled it to make a type specimen book. It has survived not only five
                            centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                            It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
                            passages, and more recently with desktop publishing software like Aldus PageMaker including
                            versions of Lorem Ipsum.</p>
                    </div>

                    <div className={`min-w-[30rem] max-w-[30rem] min-h-[30rem] max-h-[30rem] bg-blue-200`}>
                        <img
                            className="w-full h-full object-cover"
                            src="/nail_model_2.jpg"
                            alt="Modelo 1"/>
                    </div>
                </div>
            </Container>
        </main>
    );
}

