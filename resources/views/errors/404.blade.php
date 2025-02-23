<x-app-layout>
    <div class="min-h-screen flex flex-col items-center justify-center">
        <div class="text-center">
            <h1 class="text-6xl font-bold text-gray-900 mb-4">404</h1>
            <p class="text-xl text-gray-600 mb-8">Page not found</p>
            <a href="{{ route('dashboard') }}" class="btn">
                Return to Dashboard
            </a>
        </div>
    </div>
</x-app-layout>