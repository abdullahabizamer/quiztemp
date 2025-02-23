<x-app-layout>
    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                @foreach($tracks as $track)
                    <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg hover:shadow-md transition-shadow">
                        <div class="p-6">
                            <div class="flex justify-between items-start">
                                <div>
                                    <h3 class="text-lg font-semibold text-gray-900">{{ $track->name }}</h3>
                                    <p class="text-sm text-gray-600">{{ $track->description }}</p>
                                </div>
                                <a href="{{ route('tracks.questions.index', $track) }}" class="btn-primary">
                                    Continue <x-icon name="arrow-right" class="ml-2 h-4 w-4" />
                                </a>
                            </div>

                            <div class="mt-4 space-y-4">
                                <div>
                                    <div class="flex justify-between text-sm text-gray-600 mb-1">
                                        <span>Progress</span>
                                        <span>{{ $track->progress }}%</span>
                                    </div>
                                    <div class="h-2 bg-gray-200 rounded-full">
                                        <div class="h-full bg-{{ $track->color }}-600 rounded-full" style="width: {{ $track->progress }}%"></div>
                                    </div>
                                </div>

                                <div class="flex justify-between text-sm text-gray-600">
                                    <div class="flex items-center">
                                        <x-icon name="academic-cap" class="h-5 w-5 mr-2" />
                                        {{ $track->completed_questions_count }} / {{ $track->questions_count }} questions
                                    </div>
                                    @if($track->last_active)
                                        <div class="flex items-center">
                                            <x-icon name="clock" class="h-5 w-5 mr-2" />
                                            Last active {{ $track->last_active->diffForHumans() }}
                                        </div>
                                    @endif
                                </div>
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>
    </div>
</x-app-layout>