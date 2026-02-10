import './AppMenu.css';

export function AppMenu()
{
  return (
    <>
      <div className="Menu">
        <div className="Header">
          Applications
        </div>
        <div className="MenuItem">
          <a href="/user/list">
            Users
          </a>
        </div>
      </div>
    </>
  );
}
