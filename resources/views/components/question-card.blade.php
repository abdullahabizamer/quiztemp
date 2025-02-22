@props(['question'])

<div class="bg-white rounded-lg shadow-sm p-6 space-y-4">
    <h4 class="text-lg font-medium">{{ $question->question }}</h4>

    <div class="space-y-2">
        @foreach($question->options as $index => $option)
            <label class="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50 cursor-pointer">
                <input type="radio" name="question_{{ $question->id }}" value="{{ $index }}" class="form-radio">
                <span>{{ $option }}</span>
            </label>
        @endforeach
    </div>

    <div class="flex justify-end">
        <button type="button" class="inline-flex items-center px-4 py-2 bg-gray-800 rounded-md font-semibold text-xs text-white tracking-widest hover:bg-gray-700">
            Submit Answer
        </button>
    </div>
</div>