import BlogCard from "components/BlogCard/page"
import OtherLayouts from "./layout"


export default function blogPost() {
    const para = () => {}

    const blog = [
        {
            id: 1,
            imgsrc: '/BlogPostsImg/hali.jpeg',
            author: 'John Doe',
            date: new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            }),
            title: 'Haliburton Calls Game In Game 1 of The NBA Playoffs Finals- Is He Worthy of The Name "Haliban"?',
            info: `Lorem ipsum dolor sit amet,consectetur adipiscing elit. Nullam ultricies, mi sed tempor rhoncus, diam lacus laoreet ipsum, ut laoreet diam eros sed dui. 
			Quisque volutpat nec lacus id euismod. Aliquam quis suscipit purus, id aliquet magna. Sed vitae augue convallis, egestas dolor ut, lacinia orci. Mauris ipsum leo, commodo a bibendum eu, iaculis aliquet nisi. 
			Cras feugiat id massa at efficitur. Vivamus urna magna, pellentesque sit amet dignissim nec, porta sed neque.Praesent vel elit pretium, commodo lorem vel, tempor elit. 
			Aliquam id blandit ante. Aenean maximus tempor neque. Vestibulum rhoncus ex nec nisl elementum vehicula. Etiam et euismod odio, id tempor risus. 
			Cras vitae porttitor diam, ultrices venenatis neque. Phasellus dignissim purus augue, et semper ligula pellentesque quis. Sed in lorem vel nulla accumsan pretium. 
			Pellentesque nec convallis quam, vel blandit sapien. Praesent tempor felis sed turpis consectetur molestie. In vitae urna dolor.Quisque vitae ultricies nisi.
			 Mauris ut porttitor augue, eu maximus nisl. Ut a libero lobortis, consequat felis id, consectetur lectus. Fusce nulla odio, dignissim ut nulla id, lacinia dapibus elit. 
			 Sed ac maximus urna. Aliquam erat volutpat. Proin eleifend lacinia magna, maximus consequat risus ultrices at. Vestibulum posuere neque risus, efficitur interdum augue vehicula eget. 
			 Duis ac metus non nibh vestibulum porttitor quis consectetur quam. Sed nec pulvinar nulla, quis tincidunt massa. Ut suscipit pretium massa et malesuada. Curabitur quis odio mollis, laoreet mi quis, euismod elit. 
			 Pellentesque metus nunc, dapibus vulputate maximus vitae, commodo id dolor. Morbi ornare accumsan erat, eget tempor libero convallis eu. Mauris volutpat pulvinar enim vitae suscipit. Sed bibendum risus elit, sed aliquam odio finibus eu.
			 Etiam condimentum ullamcorper tempor. Proin volutpat magna vitae sem venenatis ornare in eget justo. Donec non lacus et velit tristique tincidunt. Nullam hendrerit nisi ut lacus lobortis tincidunt. Phasellus ut est ornare, lacinia dui vitae, tempor turpis. 
			 Proin ac tellus molestie, finibus mauris eget, scelerisque elit. Curabitur magna sem, eleifend sit amet leo vitae, facilisis porta arcu. Aenean a nunc vitae mauris imperdiet viverra vel nec dui. Vestibulum ut tellus vitae magna molestie tempor eu sed tortor. 
			 Maecenas tristique scelerisque metus ut semper. In vitae purus eget dui vulputate facilisis. Ut auctor neque vitae nisi iaculis cursus. Mauris sit amet gravida felis. Ut pretium ipsum a lacus varius malesuada. Vestibulum tincidunt lobortis metus ut dictum.
			 Morbi consectetur pretium est, eu hendrerit leo convallis non. Ut vitae tortor quis massa ultricies ornare nec a lectus. Nulla accumsan sit amet ipsum in congue. Ut pulvinar efficitur condimentum. 
			 Duis finibus tortor ex, in feugiat orci euismod in. 
			 Integer lobortis tortor ut maximus lobortis. Ut quis hendrerit orci, sed sollicitudin quam.'
			`,
            link: '/blogPost',
        },
    ]
    return (
        <OtherLayouts>
            <div className="pt-[90px]">
                <div>
                    {blog.map(({ title, date, imgsrc, author, info, id }) => (
                        <BlogCard
                            key={id}
                            title={title}
                            date={date}
                            imgsrc={imgsrc}
                            author={author}
                            info={info}
                        />
                    ))}
                </div>
            </div>
        </OtherLayouts>
    )
}
