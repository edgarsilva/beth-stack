export default async function PostList({ people }: { people: any }) {
  if (!people) {
    return <div>Loading...</div>;
  }

  return (
    <div class="grid grid-cols-1 gap-4 bg-green-500 sm:grid-cols-2">
      {people.map((person) => (
        <div
          class="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
          key={person.email}
        >
          <div class="flex-shrink-0">
            <img class="h-10 w-10 rounded-full" src={person.imageUrl} alt="" />
          </div>
          <div class="min-w-0 flex-1">
            <a href="#" class="focus:outline-none">
              <span class="absolute inset-0" aria-hidden="true" />
              <p class="text-sm font-medium text-gray-900">{person.name}</p>
              <p class="truncate text-sm text-gray-500">{person.role}</p>
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
