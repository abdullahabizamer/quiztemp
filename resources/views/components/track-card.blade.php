@props(['track'])

<div class="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer">
    <div class="flex justify-between items-start mb-4">
        <div>
            <h3 class="text-lg font-semibold">{{ $track->title }}</h3>
            <p class="text-gray-600">{{ $track->description }}</p>
        </div>
        
        <a href="{{ route('tracks.show', $track) }}" class="inline-flex items-center px-4 py-2 bg-gray-800 rounded-md font-semibold text-xs text-white tracking-widest hover:bg-gray-700">
            Continue <x-icon name="arrow-right" class="w-4 h-4 ml-2" />
        </a>
    </div>

    <div class="space-y-4">
        <div>
            <div class="flex justify-between items-center mb-1">
                <span class="text-sm text-gray-500">Progress</span>
                <span class="text-sm font-medium">{{ $track->progress }}%</span>
            </div>
            <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div class="h-full bg-blue-600 rounded-full" style="width: {{ $track->progress }}%"></div>
            </div>
        </div>

        <div class="flex justify-between items-center text-sm text-gray-600">
            <div class="flex items-center">
                <x-icon name="academic-cap" class="w-5 h-5 mr-2" />
                {{ $track->questions_completed }} / {{ $track->total_questions }} questions
            </div>
            <div class="flex items-center">
                <x-icon name="clock" class="w-5 h-5 mr-2" />
                Last active {{ $track->last_active->diffForHumans() }}
            </div>
        </div>
    </div>
</div>