-- ============================================================
-- CardTradr - Esquema de Base de Datos
-- Ejecutar en: Supabase Dashboard > SQL Editor
-- Fecha: 2026-02-09
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- 1. PROFILES
-- ============================================================

CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  username TEXT UNIQUE,
  email TEXT,
  avatar_url TEXT,
  preferred_tcg TEXT DEFAULT 'pokemon',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear perfil automaticamente al registrarse
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, username)
  VALUES (NEW.id, NEW.email, SPLIT_PART(NEW.email, '@', 1));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- 2. COLLECTIONS
-- ============================================================

CREATE TABLE collections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  tcg_type TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  is_default BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_collections_user_id ON collections(user_id);
CREATE INDEX idx_collections_tcg_type ON collections(tcg_type);

-- Solo una coleccion default por usuario+TCG
CREATE UNIQUE INDEX idx_one_default_collection
  ON collections(user_id, tcg_type)
  WHERE is_default = TRUE;

-- ============================================================
-- 3. COLLECTION_CARDS
-- ============================================================

CREATE TABLE collection_cards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  collection_id UUID REFERENCES collections(id) ON DELETE CASCADE NOT NULL,
  card_id TEXT NOT NULL,
  tcg_type TEXT NOT NULL,
  card_name TEXT NOT NULL,
  set_name TEXT,
  quantity INT DEFAULT 1 CHECK (quantity > 0),
  condition TEXT DEFAULT 'near_mint',
  language TEXT DEFAULT 'en',
  is_foil BOOLEAN DEFAULT FALSE,
  is_favorite BOOLEAN DEFAULT FALSE,
  notes TEXT,
  acquired_date DATE,
  acquired_price DECIMAL(10,2),
  -- Cache de datos TCGAPIs
  cached_price DECIMAL(10,2),
  cached_image_url TEXT,
  cached_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(collection_id, card_id, condition, is_foil)
);

CREATE INDEX idx_collection_cards_collection_id ON collection_cards(collection_id);
CREATE INDEX idx_collection_cards_tcg_type ON collection_cards(tcg_type);
CREATE INDEX idx_collection_cards_card_name ON collection_cards(card_name);

-- Auto-update de updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_collection_cards_updated_at
  BEFORE UPDATE ON collection_cards
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- 4. WISHLISTS
-- ============================================================

CREATE TABLE wishlists (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  card_id TEXT NOT NULL,
  tcg_type TEXT NOT NULL,
  card_name TEXT NOT NULL,
  priority INT DEFAULT 1 CHECK (priority BETWEEN 1 AND 5),
  max_price DECIMAL(10,2),
  notes TEXT,
  cached_price DECIMAL(10,2),
  cached_image_url TEXT,
  cached_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, card_id, tcg_type)
);

CREATE INDEX idx_wishlists_user_id ON wishlists(user_id);
CREATE INDEX idx_wishlists_user_tcg ON wishlists(user_id, tcg_type);

-- ============================================================
-- 5. ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE collection_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlists ENABLE ROW LEVEL SECURITY;

-- PROFILES
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE USING (auth.uid() = id);

-- COLLECTIONS
CREATE POLICY "Users can view own collections"
  ON collections FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own collections"
  ON collections FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own collections"
  ON collections FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own collections"
  ON collections FOR DELETE USING (auth.uid() = user_id);

-- COLLECTION_CARDS
CREATE POLICY "Users can view own collection cards"
  ON collection_cards FOR SELECT
  USING (collection_id IN (SELECT id FROM collections WHERE user_id = auth.uid()));
CREATE POLICY "Users can insert into own collections"
  ON collection_cards FOR INSERT
  WITH CHECK (collection_id IN (SELECT id FROM collections WHERE user_id = auth.uid()));
CREATE POLICY "Users can update own collection cards"
  ON collection_cards FOR UPDATE
  USING (collection_id IN (SELECT id FROM collections WHERE user_id = auth.uid()));
CREATE POLICY "Users can delete own collection cards"
  ON collection_cards FOR DELETE
  USING (collection_id IN (SELECT id FROM collections WHERE user_id = auth.uid()));

-- WISHLISTS
CREATE POLICY "Users can view own wishlists"
  ON wishlists FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own wishlist items"
  ON wishlists FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own wishlist items"
  ON wishlists FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own wishlist items"
  ON wishlists FOR DELETE USING (auth.uid() = user_id);
