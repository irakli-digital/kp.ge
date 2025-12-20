-- Calculator Sponsorship Tables for KP.ge
-- Run this SQL in your Neon database console

-- Sponsorship Packages (Bronze, Silver, Gold)
CREATE TABLE IF NOT EXISTS calculator_packages (
  id SERIAL PRIMARY KEY,
  type VARCHAR(50) NOT NULL, -- "bronze", "silver", "gold"
  name VARCHAR(100) NOT NULL, -- Georgian name
  base_price DECIMAL(10, 2) NOT NULL,
  tag VARCHAR(50) NOT NULL, -- "საბაზისო", "პოპულარული", "პრემიუმი"
  tag_classes TEXT NOT NULL, -- CSS classes for styling
  is_active BOOLEAN DEFAULT true NOT NULL,
  sort_order INTEGER DEFAULT 0 NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Package Features
CREATE TABLE IF NOT EXISTS calculator_package_features (
  id SERIAL PRIMARY KEY,
  package_id INTEGER NOT NULL REFERENCES calculator_packages(id) ON DELETE CASCADE,
  feature TEXT NOT NULL, -- Georgian text
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Duration Options (contract lengths with discounts)
CREATE TABLE IF NOT EXISTS calculator_durations (
  id SERIAL PRIMARY KEY,
  months INTEGER NOT NULL,
  discount_percent INTEGER NOT NULL DEFAULT 0,
  label VARCHAR(100) NOT NULL, -- Georgian label
  is_active BOOLEAN DEFAULT true NOT NULL,
  sort_order INTEGER DEFAULT 0 NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- One-Time Services
CREATE TABLE IF NOT EXISTS calculator_one_time_services (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL, -- Georgian name
  price DECIMAL(10, 2) NOT NULL,
  description TEXT, -- Georgian description
  is_active BOOLEAN DEFAULT true NOT NULL,
  sort_order INTEGER DEFAULT 0 NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Episode Count Options (for one-time services)
CREATE TABLE IF NOT EXISTS calculator_episode_counts (
  id SERIAL PRIMARY KEY,
  count INTEGER NOT NULL,
  discount_percent INTEGER NOT NULL DEFAULT 0,
  label VARCHAR(100) NOT NULL, -- Georgian label
  is_active BOOLEAN DEFAULT true NOT NULL,
  sort_order INTEGER DEFAULT 0 NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Contact Form Submissions
CREATE TABLE IF NOT EXISTS calculator_submissions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  company VARCHAR(100),
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(30),
  message TEXT,
  -- Calculator mode: 'subscription' or 'one_time'
  calculator_mode VARCHAR(20) NOT NULL,
  -- For subscription mode
  selected_package VARCHAR(50),
  selected_package_name VARCHAR(100),
  duration_months INTEGER,
  -- For one-time mode
  selected_services TEXT, -- JSON array of service names
  episode_count INTEGER,
  -- Calculated prices
  monthly_price DECIMAL(10, 2),
  total_price DECIMAL(10, 2),
  discount_amount DECIMAL(10, 2),
  -- Metadata
  created_at TIMESTAMP DEFAULT NOW(),
  is_read BOOLEAN DEFAULT false
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_calc_packages_active ON calculator_packages(is_active, sort_order);
CREATE INDEX IF NOT EXISTS idx_calc_package_features_pkg ON calculator_package_features(package_id, sort_order);
CREATE INDEX IF NOT EXISTS idx_calc_durations_active ON calculator_durations(is_active, sort_order);
CREATE INDEX IF NOT EXISTS idx_calc_services_active ON calculator_one_time_services(is_active, sort_order);
CREATE INDEX IF NOT EXISTS idx_calc_episodes_active ON calculator_episode_counts(is_active, sort_order);
CREATE INDEX IF NOT EXISTS idx_calc_submissions_created ON calculator_submissions(created_at DESC);

-- Insert default data

-- Default Packages
INSERT INTO calculator_packages (type, name, base_price, tag, tag_classes, sort_order) VALUES
('bronze', 'ბრინჯაოს პაკეტი', 1500, 'საბაზისო', 'bg-amber-700/20 text-amber-600', 1),
('silver', 'ვერცხლის პაკეტი', 2500, 'პოპულარული', 'bg-zinc-400/20 text-zinc-300', 2),
('gold', 'ოქროს პაკეტი', 4000, 'პრემიუმი', 'bg-yellow-500/20 text-yellow-400', 3);

-- Default Package Features
INSERT INTO calculator_package_features (package_id, feature, sort_order) VALUES
-- Bronze features
(1, 'ლოგოს განთავსება ვიდეოში', 1),
(1, 'მოხსენიება პოდკასტში', 2),
(1, 'სოციალური მედიის პოსტი', 3),
-- Silver features
(2, 'ლოგოს განთავსება ვიდეოში', 1),
(2, 'მოხსენიება პოდკასტში', 2),
(2, 'სოციალური მედიის პოსტი', 3),
(2, 'სპონსორის წუთი (60 წამი)', 4),
(2, 'ვებსაიტზე განთავსება', 5),
-- Gold features
(3, 'ლოგოს განთავსება ვიდეოში', 1),
(3, 'მოხსენიება პოდკასტში', 2),
(3, 'სოციალური მედიის პოსტები (2x)', 3),
(3, 'სპონსორის წუთი (90 წამი)', 4),
(3, 'ვებსაიტზე განთავსება', 5),
(3, 'ექსკლუზიური ინტერვიუ/კონტენტი', 6),
(3, 'პრიორიტეტული მხარდაჭერა', 7);

-- Default Durations
INSERT INTO calculator_durations (months, discount_percent, label, sort_order) VALUES
(1, 0, '1 თვე', 1),
(3, 10, '3 თვე', 2),
(6, 15, '6 თვე', 3),
(12, 25, '12 თვე', 4);

-- Default One-Time Services
INSERT INTO calculator_one_time_services (name, price, description, sort_order) VALUES
('ლოგოს განთავსება', 300, 'თქვენი ლოგო ვიდეოს დასაწყისში ან ბოლოს', 1),
('სპონსორის მოხსენიება', 400, 'წამყვანის მიერ თქვენი ბრენდის მოხსენიება', 2),
('სოციალური მედია პოსტი', 200, 'პოსტი ჩვენს სოციალურ ქსელებში', 3),
('პროდუქტის მიმოხილვა', 800, 'თქვენი პროდუქტის დეტალური მიმოხილვა', 4),
('ინტეგრირებული კონტენტი', 1200, 'თქვენს ბრენდზე მორგებული კონტენტი', 5);

-- Default Episode Counts
INSERT INTO calculator_episode_counts (count, discount_percent, label, sort_order) VALUES
(1, 0, '1 ეპიზოდი', 1),
(3, 5, '3 ეპიზოდი', 2),
(5, 10, '5 ეპიზოდი', 3),
(10, 20, '10 ეპიზოდი', 4);
