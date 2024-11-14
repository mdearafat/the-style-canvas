export default function TabSection({ activeTab, onTabChange }) {
  return (
    <section>
      <div className="max-w-screen-xl container mx-auto px-4 py-10 flex justify-center">
        <div className="inline-flex flex-wrap border border-primary-600">
          <button
            onClick={() => onTabChange('colors')}
            className={`py-4 px-6 sm:px-10 md:px-28 max-w-[400px] text-primary-700 border-2 border-primary-600 hover:bg-primary-600 hover:text-white transition ${
              activeTab === 'colors' ? 'bg-primary-600 text-white' : ''
            }`}
          >
            Colors
          </button>
          <button
            onClick={() => onTabChange('typography')}
            className={`py-4 px-6 sm:px-10 md:px-28 max-w-[400px] text-primary-700 border-2 border-primary-600 hover:bg-primary-600 hover:text-white transition ${
              activeTab === 'typography' ? 'bg-primary-600 text-white' : ''
            }`}
          >
            Typography
          </button>
        </div>
      </div>
    </section>
  );
}
