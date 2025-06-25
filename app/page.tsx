import BlogItems from 'components/BlogItems/BlogItems'
import Navbar from 'components/Navbar/Navbar'

export default function Home() {
    const blog = [
        {
            id: 1,
            imgsrc: '/BlogPostsImg/injury.jpeg',
            author: 'Loren ipsum',
            date: new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            }),
            title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean bibendum eget justo eget blandit. Fusce vitae tempor turpis. Sedscelerisque elementum eros, a porta erat auctor sit amet.',
        },
        {
            id: 2,
            imgsrc: '/BlogPostsImg/champs.jpeg',
            author: 'Loren ipsum',
            date: new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            }),
            title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean bibendum eget justo eget blandit. Fusce vitae tempor turpis. Sedscelerisque elementum eros, a porta erat auctor sit amet.',
        },
        {
            id: 3,
            imgsrc: '/BlogPostsImg/f1.png',
            author: 'Loren ipsum',
            date: new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            }),
            title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean bibendum eget justo eget blandit. Fusce vitae tempor turpis. Sedscelerisque elementum eros, a porta erat auctor sit amet.',
        },
        {
            id: 4,
            imgsrc: '/BlogPostsImg/hali.jpeg',
            author: 'Loren ipsum',
            date: new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            }),
            title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean bibendum eget justo eget blandit. Fusce vitae tempor turpis. Sedscelerisque elementum eros, a porta erat auctor sit amet.',
        },
        {
            id: 5,
            imgsrc: '/BlogPostsImg/james.png',
            author: 'Loren ipsum',
            date: new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            }),
            title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean bibendum eget justo eget blandit. Fusce vitae tempor turpis. Sedscelerisque elementum eros, a porta erat auctor sit amet.',
        },
        {
            id: 6,
            imgsrc: '/BlogPostsImg/oscars.jpg',
            author: 'Loren ipsum',
            date: new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            }),
            title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean bibendum eget justo eget blandit. Fusce vitae tempor turpis. Sedscelerisque elementum eros, a porta erat auctor sit amet.',
        },
        {
            id: 7,
            imgsrc: '/BlogPostsImg/celtics.png',
            author: 'Loren ipsum',
            date: new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            }),
            title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean bibendum eget justo eget blandit. Fusce vitae tempor turpis. Sedscelerisque elementum eros, a porta erat auctor sit amet.',
        },
        {
            id: 8,
            imgsrc: '/BlogPostsImg/nfl.jpeg',
            author: 'Loren ipsum',
            date: new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            }),
            title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean bibendum eget justo eget blandit. Fusce vitae tempor turpis. Sedscelerisque elementum eros, a porta erat auctor sit amet.',
        },
    ]

    return (
        <>
            <Navbar />
            <main>
                <div className="flex justify-center pt-[30px] pb-[30px]">
                    <h1 className="text-[40px] font-bold">LATEST STORIES</h1>
                </div>
                <div className="grid grid-cols-3 place-items-center p-4">
                    {blog.map(({ imgsrc, author, date, title, info, id }) => (
                        <BlogItems
                            key={id}
                            imgsrc={imgsrc}
                            author={author}
                            date={date}
                            title={title}
                            info={info}
                            id={id}
                        />
                    ))}
                </div>
            </main>
        </>
    )
}
