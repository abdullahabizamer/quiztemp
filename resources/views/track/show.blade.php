<x-app-layout>
    <div class="space-y-6">
        <x-search-filters />

        <div class="bg-white rounded-lg shadow p-6">
            <div class="space-y-6">
                @foreach($questions as $question)
                    <x-question-card :question="$question" />
                @endforeach
            </div>

            {{ $questions->links() }}
        </div>
    </div>
</x-app-layout>