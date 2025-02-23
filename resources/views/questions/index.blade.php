<x-app-layout>
    <x-slot name="header">
        <div class="flex justify-between items-center">
            <h2 class="text-xl font-semibold text-gray-800">
                {{ $track->name }} - Practice Questions
            </h2>
            <div class="flex space-x-4">
                <x-dropdown>
                    <x-slot name="trigger">
                        <button class="btn-secondary">
                            {{ request('topic', 'All Topics') }}
                            <x-icon name="chevron-down" class="ml-2 h-4 w-4" />
                        </button>
                    </x-slot>
                    <x-dropdown-link href="{{ request()->url() }}">
                        All Topics
                    </x-dropdown-link>
                    @foreach($topics as $topic)
                        <x-dropdown-link href="{{ request()->fullUrlWithQuery(['topic' => $topic]) }}">
                            {{ ucfirst($topic) }}
                        </x-dropdown-link>
                    @endforeach
                </x-dropdown>

                <x-dropdown>
                    <x-slot name="trigger">
                        <button class="btn-secondary">
                            {{ request('difficulty', 'All Difficulties') }}
                            <x-icon name="chevron-down" class="ml-2 h-4 w-4" />
                        </button>
                    </x-slot>
                    <x-dropdown-link href="{{ request()->url() }}">
                        All Difficulties
                    </x-dropdown-link>
                    @foreach($difficulties as $difficulty)
                        <x-dropdown-link href="{{ request()->fullUrlWithQuery(['difficulty' => $difficulty]) }}">
                            {{ ucfirst($difficulty) }}
                        </x-dropdown-link>
                    @endforeach
                </x-dropdown>
            </div>
        </div>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
            @foreach($questions as $question)
                <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div class="p-6">
                        <div class="flex items-start justify-between">
                            <h3 class="text-lg font-medium text-gray-900">{{ $question->question }}</h3>
                            <span class="px-2 py-1 text-xs font-medium rounded-full
                                {{ $question->difficulty === 'easy' ? 'bg-green-100 text-green-800' : '' }}
                                {{ $question->difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' : '' }}
                                {{ $question->difficulty === 'hard' ? 'bg-red-100 text-red-800' : '' }}">
                                {{ ucfirst($question->difficulty) }}
                            </span>
                        </div>

                        <form class="mt-4 question-form" action="{{ route('questions.answer', $question) }}" method="POST">
                            @csrf
                            <div class="space-y-2">
                                @foreach($question->options as $index => $option)
                                    <label class="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50 cursor-pointer
                                        {{ $question->userAnswers->contains('answer', $index) ? ($question->userAnswers->first()->is_correct ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200') : '' }}">
                                        <input type="radio" 
                                            name="answer" 
                                            value="{{ $index }}" 
                                            class="form-radio"
                                            {{ $question->userAnswers->isNotEmpty() ? 'disabled' : '' }}>
                                        <span class="flex-grow">{{ $option }}</span>
                                        @if($question->userAnswers->isNotEmpty())
                                            @if($index === $question->correct_answer)
                                                <x-icon name="check-circle" class="h-5 w-5 text-green-500" />
                                            @endif
                                        @endif
                                    </label>
                                @endforeach
                            </div>
                            @if($question->userAnswers->isEmpty())
                                <div class="mt-4 flex justify-end">
                                    <button type="submit" class="btn-primary">
                                        Submit Answer
                                    </button>
                                </div>
                            @endif
                        </form>

                        @if($question->userAnswers->isNotEmpty())
                            <div class="mt-4 p-4 bg-gray-50 rounded-lg">
                                <p class="font-medium text-gray-900">Explanation:</p>
                                <p class="mt-2 text-gray-600">{{ $question->explanation }}</p>
                            </div>
                        @endif
                    </div>
                </div>
            @endforeach

            <div class="mt-4">
                {{ $questions->links() }}
            </div>
        </div>
    </div>
</x-app-layout>