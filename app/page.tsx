import BlogItems from 'components/BlogItems/BlogItems'
import Footer from 'components/Footer/Footer'
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
            link: '/blogPost',
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
            link: '/blogPost',
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
            link: '/blogPost',
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
            link: '/blogPost',
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
            link: '/blogPost',
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
            link: '/blogPost',
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
            link: '/blogPost',
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
            link: '/blogPost',
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
                    {blog.map(({ imgsrc, author, date, title, info, id, link }) => (
                        <BlogItems
                            key={id}
                            imgsrc={imgsrc}
                            author={author}
                            date={date}
                            title={title}
                            info={info}
                            link={link}
                        />
                    ))}
                </div>
            </main>
            <Footer />
        </>
    )
}
