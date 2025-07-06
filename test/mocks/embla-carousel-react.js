const mockEmblaApi = {
  canScrollNext: vi.fn().mockReturnValue(true),
  canScrollPrev: vi.fn().mockReturnValue(true),
  scrollNext: vi.fn(),
  scrollPrev: vi.fn(),
  scrollTo: vi.fn(),
  on: vi.fn(),
  off: vi.fn(),
};

const useEmblaCarousel = vi.fn(() => [vi.fn(), mockEmblaApi]);

export default useEmblaCarousel;
