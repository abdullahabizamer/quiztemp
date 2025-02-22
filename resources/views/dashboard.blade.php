<x-app-layout>
    <div class="space-y-6">
        <x-search-filters />

        <div class="grid grid-cols-2 gap-8">
            @foreach($tracks as $track)
                <x-track-card :track="$track" />
            @endforeach
        </div>
    </div>
</x-app-layout>