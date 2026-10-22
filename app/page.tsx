import HomePage from '../components/home-page'
import { getPosts } from '../lib/posts'

// Server component: reads the markdown files in /posts at build time
// and passes them to the homepage.
export default function Page() {
  return <HomePage posts={getPosts()} />
}
