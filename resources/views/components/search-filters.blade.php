<div class="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
    <form action="" method="GET" class="flex gap-4 items-center">
        <div class="flex-1 relative">
            <x-icon name="search" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input type="text" name="search" placeholder="Search questions..." class="w-full pl-10 pr-4 py-2 border rounded-md">
        </div>

        <div class="flex items-center gap-2">
            <select name="year" class="border rounded-md">
                <option value="">Select Year</option>
                @foreach(range(date('Y'), 2020) as $year)
                    <option value="{{ $year }}">{{ $year }}</option>
                @endforeach
            </select>

            <select name="topic" class="border rounded-md">
                <option value="">Select Topic</option>
                @foreach($topics as $topic)
                    <option value="{{ $topic }}">{{ $topic }}</option>
                @endforeach
            </select>

            <select name="difficulty" class="border rounded-md">
                <option value="">Select Difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </select>

            <button type="submit" class="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700">
                Apply Filters
            </button>
        </div>
    </form>
</div>