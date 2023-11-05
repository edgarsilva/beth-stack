// Components
import BaseHtml from "@/pages/layouts/base";
import PostList from "@/components/PostList";

export function PostsIndexPage(props: {}) {
  return (
    <BaseHtml>
      <div class="h-screen w-screen bg-gray-900">
        <PostList people={[]} />
      </div>
    </BaseHtml>
  );
}

export default PostsIndexPage;
