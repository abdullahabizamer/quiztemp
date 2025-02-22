<aside class="w-64 bg-white border-r h-screen">
    <div class="p-6">
        <h2 class="text-2xl font-bold">ExamPrep</h2>
    </div>
    
    <nav class="mt-6">
        <x-nav-link href="{{ route('dashboard') }}" :active="request()->routeIs('dashboard')">
            <x-icon name="home" class="w-5 h-5 mr-2" /> Dashboard
        </x-nav-link>

        @foreach($tracks as $track)
            <x-nav-link href="{{ route('tracks.show', $track) }}" :active="request()->routeIs('tracks.show', $track)">
                <x-icon name="academic-cap" class="w-5 h-5 mr-2" /> {{ $track->title }}
            </x-nav-link>
        @endforeach

        @if(auth()->user()->is_admin)
            <x-nav-link href="{{ route('admin.dashboard') }}" :active="request()->routeIs('admin.dashboard')">
                <x-icon name="cog" class="w-5 h-5 mr-2" /> Admin Dashboard
            </x-nav-link>
        @endif
    </nav>
</aside>