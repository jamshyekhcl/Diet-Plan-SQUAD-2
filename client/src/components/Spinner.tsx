const LoadingSpinner = () => (
  <div
    className='flex items-center justify-center h-screen'
    data-testid='spinnerComponent'>
    <div className='animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500'></div>
  </div>
);
export default LoadingSpinner;
