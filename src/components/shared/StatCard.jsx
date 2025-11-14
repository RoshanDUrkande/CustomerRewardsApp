export const StatCard = ({ title, value, unit = '', color }) => {
    // Map internal color names to appropriate Tailwind classes
    let twColorClasses = '';
    switch(color) {
        case 'indigo':
            twColorClasses = 'bg-indigo-600 text-white';
            break;
        case 'green':
            twColorClasses = 'bg-green-500 text-white';
            break;
        case 'yellow':
            twColorClasses = 'bg-yellow-400 text-gray-900';
            break;
        default:
            twColorClasses = 'bg-gray-500 text-white';
    }

    return (
        <div className={`p-5 rounded-xl shadow-lg transition duration-300 ${twColorClasses} flex flex-col`}>
            <p className="text-sm font-medium opacity-80 mb-1 uppercase tracking-wider">{title}</p>
            <div className="flex items-baseline">
                <p className="text-4xl font-extrabold mb-0 leading-tight">{value}</p>
                {unit && <span className="ml-2 text-base opacity-70">{unit}</span>}
            </div>
        </div>
    );
};
